import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CaptchaService } from '../../services/captcha.service';

type CaptchaStatus = 'idle' | 'loading' | 'verified' | 'error' | 'expired' | 'disabled';

/**
 * Reusable, drop-in reCAPTCHA control.
 *
 * Usage in any Reactive Form:
 *   1. Add a control:  captcha: ['']
 *   2. Render:         <app-captcha formControlName="captcha" action="contact" />
 *   3. On submit:      if (!(await this.captchaRef.execute())) return;
 *
 * - Implements ControlValueAccessor, so the verified token is the control value.
 * - v3: invisible; `execute()` fetches a fresh token at submit time (handles
 *   token expiry by design — tokens are never reused).
 * - v2: renders a checkbox; the token is captured on solve and cleared on expiry.
 * - When no site key is configured (e.g. local dev) the control reports a
 *   "disabled" sentinel so forms remain usable without a key.
 */
@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (service.version === 'v2' && service.isActive) {
      <div class="space-y-2">
        <div #v2Host class="inline-block min-h-[78px]"></div>
      </div>
    } @else {
      <!-- v3 is invisible; show the required Google attribution badge note. -->
      <p class="text-brand-white/30 font-poppins text-xs leading-relaxed">
        Protected by reCAPTCHA — Google
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="text-brand-white/40 hover:text-brand-gold underline">Privacy</a>
        &amp;
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener" class="text-brand-white/40 hover:text-brand-gold underline">Terms</a>
        apply.
      </p>
    }

    @if (message()) {
      <p
        class="mt-2 font-poppins text-xs"
        [class.text-brand-pink]="status() === 'error' || status() === 'expired'"
        [class.text-brand-gold]="status() === 'verified' || status() === 'loading'"
        role="status"
        aria-live="polite"
      >
        {{ message() }}
      </p>
    }
  `,
  styles: [`:host { display: block; }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CaptchaComponent),
      multi: true,
    },
  ],
})
export class CaptchaComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  readonly service = inject(CaptchaService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** reCAPTCHA v3 action label (helps server-side analytics). */
  @Input() action = 'submit';

  @ViewChild('v2Host') private v2Host?: ElementRef<HTMLElement>;

  readonly status = signal<CaptchaStatus>('idle');
  readonly message = signal<string>('');

  private token: string | null = null;
  private v2WidgetId: number | null = null;
  private disabled = false;

  // --- ControlValueAccessor wiring ---
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }
    if (!this.service.isActive) {
      // No site key configured — operate in pass-through mode.
      this.status.set('disabled');
      return;
    }
    if (this.service.version === 'v2') {
      this.renderV2Widget();
    } else {
      // Warm up the v3 SDK so the first submit is fast.
      void this.service.load();
    }
  }

  ngOnDestroy(): void {
    this.service.resetV2(this.v2WidgetId);
  }

  private async renderV2Widget(): Promise<void> {
    const loaded = await this.service.load();
    if (!loaded || !this.v2Host) {
      this.status.set('error');
      this.message.set('Could not load verification. Please refresh and try again.');
      return;
    }
    this.v2WidgetId = this.service.renderV2(this.v2Host.nativeElement, {
      onVerified: (token) => this.setToken(token, 'verified'),
      onExpired: () => {
        this.setToken(null, 'expired');
        this.message.set('Verification expired — please confirm again.');
      },
      onError: () => {
        this.setToken(null, 'error');
        this.message.set('Verification failed. Please try again.');
      },
    });
  }

  /**
   * Gate called from a form's submit handler. Resolves to `true` when the
   * form may proceed and `false` when it must be blocked.
   */
  async execute(): Promise<boolean> {
    this.onTouched();

    // Pass-through when captcha is not configured.
    if (this.disabled || !this.service.isActive) {
      this.setToken('recaptcha-disabled', 'disabled');
      return true;
    }

    if (this.service.version === 'v2') {
      if (this.token) {
        this.message.set('');
        return true;
      }
      this.status.set('error');
      this.message.set('Please confirm you are not a robot.');
      return false;
    }

    // v3: always request a fresh token so expiry is never an issue.
    this.status.set('loading');
    this.message.set('Verifying…');
    const token = await this.service.executeV3(this.action);
    if (token) {
      this.setToken(token, 'verified');
      this.message.set('');
      return true;
    }
    this.setToken(null, 'error');
    this.message.set('Verification failed. Please check your connection and try again.');
    return false;
  }

  /** Clears the current token (e.g. after a successful submit / form reset). */
  reset(): void {
    this.setToken(null, this.service.isActive ? 'idle' : 'disabled');
    this.message.set('');
    if (this.service.version === 'v2') {
      this.service.resetV2(this.v2WidgetId);
    }
  }

  private setToken(token: string | null, status: CaptchaStatus): void {
    this.token = token;
    this.status.set(status);
    this.onChange(token);
  }

  // --- ControlValueAccessor ---
  writeValue(value: string | null): void {
    this.token = value ?? null;
    if (!value && this.status() === 'verified') {
      this.status.set(this.service.isActive ? 'idle' : 'disabled');
    }
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
