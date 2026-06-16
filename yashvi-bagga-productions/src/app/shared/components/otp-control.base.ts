import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { OtpService } from '../services/otp-base.service';

export type OtpStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error';

/** Channel-specific copy supplied by each concrete component. */
export interface OtpLabels {
  /** Button text to request the first code, e.g. "Verify Email" / "Send OTP". */
  sendLabel: string;
  /** Toast/label while requesting, e.g. "Sending OTP…". */
  sendingLabel: string;
  /** Success copy, e.g. "Email Verified" / "Mobile Number Verified". */
  verifiedLabel: string;
  /** OTP input placeholder. */
  inputLabel: string;
  /** Friendly destination noun for error copy, e.g. "email" / "mobile number". */
  noun: string;
}

/**
 * Shared logic for the email + mobile OTP controls. Concrete components
 * (EmailOtpComponent / MobileOtpComponent) supply only a service, labels and a
 * template — all behaviour (request, verify, resend cooldown, attempt limits,
 * expiry handling, toasts and ControlValueAccessor wiring) lives here so there
 * is no duplication.
 *
 * The control's VALUE is the verification token (string when verified, null
 * otherwise) — add `Validators.required` on the parent control to gate submit.
 */
@Directive()
export abstract class OtpControlBase implements ControlValueAccessor, OnChanges, OnDestroy {
  protected abstract readonly service: OtpService;
  protected abstract readonly labels: OtpLabels;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  protected readonly toast = inject(ToastService);

  /** Destination to verify (email address or mobile number). */
  @Input() destination = '';
  /** Whether the bound destination currently passes its own field validation. */
  @Input() destinationValid = false;
  /** Context tag forwarded to the backend. */
  @Input() purpose = 'inquiry-form';

  readonly status = signal<OtpStatus>('idle');
  readonly sent = signal(false);
  readonly errorMsg = signal('');
  readonly resendRemaining = signal(0);
  readonly resendAttempts = signal(0);

  readonly verified = computed(() => this.status() === 'verified');
  readonly busy = computed(() => this.status() === 'sending' || this.status() === 'verifying');
  readonly canResend = computed(
    () => this.resendRemaining() === 0 && this.resendAttempts() < this.service.maxResendAttempts
  );

  code = '';

  private token: string | null = null;
  private verificationId?: string;
  private lockedDestination = '';
  private intervalId: ReturnType<typeof setInterval> | null = null;

  // --- ControlValueAccessor ---
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  get codeLength(): number {
    return this.service.codeLength;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['destination'] && !changes['destination'].firstChange) {
      // If the user edits the destination after starting verification, the
      // prior verification is no longer valid — reset cleanly.
      if (this.status() !== 'idle' && this.destination !== this.lockedDestination) {
        this.reset();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  /** Request the first OTP. */
  requestCode(): void {
    this.onTouched();
    if (!this.destination || !this.destinationValid) {
      this.errorMsg.set(`Please enter a valid ${this.labels.noun} first.`);
      this.toast.error(`Please enter a valid ${this.labels.noun} first.`);
      return;
    }
    this.dispatchRequest();
  }

  /** Resend the OTP (respects cooldown + max attempts). */
  resend(): void {
    if (!this.canResend()) {
      if (this.resendAttempts() >= this.service.maxResendAttempts) {
        this.toast.error('Maximum resend attempts reached. Please try again later.');
      }
      return;
    }
    this.dispatchRequest();
  }

  private dispatchRequest(): void {
    this.status.set('sending');
    this.errorMsg.set('');
    this.lockedDestination = this.destination;
    const loadingId = this.toast.loading(this.labels.sendingLabel);

    this.service.request(this.destination, this.purpose).subscribe((res) => {
      if (res.success) {
        this.verificationId = res.verificationId;
        this.sent.set(true);
        this.status.set('sent');
        this.resendAttempts.update((n) => n + 1);
        this.startCountdown(res.cooldownSeconds ?? this.service.cooldownSeconds);
        this.toast.update(loadingId, 'success', 'OTP Sent Successfully');
      } else {
        this.status.set(this.sent() ? 'sent' : 'error');
        this.errorMsg.set(res.error ?? 'Could not send OTP.');
        this.toast.update(loadingId, 'error', res.error ?? 'Could not send OTP.');
      }
    });
  }

  /** Verify the entered code. */
  verifyCode(): void {
    this.onTouched();
    const code = (this.code ?? '').trim();
    if (code.length !== this.codeLength) {
      this.errorMsg.set(`Enter the ${this.codeLength}-digit code.`);
      return;
    }

    this.status.set('verifying');
    this.errorMsg.set('');
    const loadingId = this.toast.loading('Verifying OTP…');

    this.service.verify(this.destination, code, this.verificationId).subscribe((res) => {
      if (res.verified) {
        this.setToken(res.token ?? `verified-${this.labels.noun}`);
        this.status.set('verified');
        this.stopCountdown();
        this.toast.update(loadingId, 'success', this.labels.verifiedLabel);
      } else if (res.expired) {
        this.status.set('sent');
        this.errorMsg.set('OTP Expired — please resend.');
        this.toast.update(loadingId, 'error', 'OTP Expired');
      } else {
        this.status.set('sent');
        const remaining =
          res.attemptsRemaining !== undefined ? ` (${res.attemptsRemaining} attempts left)` : '';
        this.errorMsg.set((res.error ?? 'Invalid OTP') + remaining);
        this.toast.update(loadingId, 'error', res.error ?? 'Invalid OTP');
      }
    });
  }

  onCodeInput(event: Event): void {
    // Numeric only, clamp to expected length.
    const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, this.codeLength);
    this.code = raw;
    (event.target as HTMLInputElement).value = raw;
  }

  /** Full reset back to the unverified idle state (also clears the token). */
  reset(): void {
    this.softReset();
    this.setToken(null);
  }

  /** Resets visual/internal state without emitting a value change. */
  private softReset(): void {
    this.stopCountdown();
    this.status.set('idle');
    this.sent.set(false);
    this.code = '';
    this.errorMsg.set('');
    this.resendRemaining.set(0);
    this.resendAttempts.set(0);
    this.verificationId = undefined;
    this.lockedDestination = '';
  }

  private startCountdown(seconds: number): void {
    this.resendRemaining.set(seconds);
    this.stopCountdown();
    if (!this.isBrowser) {
      return;
    }
    this.intervalId = setInterval(() => {
      const next = this.resendRemaining() - 1;
      this.resendRemaining.set(Math.max(0, next));
      if (next <= 0) {
        this.stopCountdown();
      }
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private setToken(token: string | null): void {
    this.token = token;
    this.onChange(token);
  }

  writeValue(value: string | null): void {
    this.token = value ?? null;
    if (value) {
      this.status.set('verified');
      this.sent.set(true);
    } else if (this.status() !== 'idle') {
      // Cleared externally (e.g. form.reset()) — return to a clean state.
      this.softReset();
    }
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
