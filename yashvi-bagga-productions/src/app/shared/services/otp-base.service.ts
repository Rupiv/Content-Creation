import { inject, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  OtpChannel,
  OtpRequestResult,
  OtpVerificationResult,
} from '../models/otp.model';
import { ToastService } from './toast.service';
import { simpleHash } from '../utils/hash.util';

interface MockRecord {
  codeHash: string;
  verificationId: string;
  expiresAt: number;
  verifyAttempts: number;
}

/** Shape consumed by the OTP UI components — both channel services satisfy it. */
export interface OtpService {
  readonly channel: OtpChannel;
  readonly codeLength: number;
  readonly cooldownSeconds: number;
  readonly maxResendAttempts: number;
  readonly ttlSeconds: number;
  request(destination: string, purpose?: string): Observable<OtpRequestResult>;
  verify(destination: string, code: string, verificationId?: string): Observable<OtpVerificationResult>;
}

/**
 * Shared OTP logic for both the email and mobile channels.
 *
 * Production: posts to the configured backend endpoints, which own code
 * generation, hashed storage, expiry, rate limiting and replay protection.
 *
 * Dev mock mode (`environment.otp.mockMode`): simulates the full lifecycle
 * locally — generates a code, surfaces it via toast + console for testing,
 * stores only a HASH (never plain text), and enforces TTL + verify attempts.
 *
 * All methods resolve gracefully and never throw to the caller.
 */
export abstract class AbstractOtpService implements OtpService {
  protected readonly http = inject(HttpClient);
  protected readonly toast = inject(ToastService);
  protected readonly cfg = environment.otp;

  abstract readonly channel: OtpChannel;
  /** Endpoints relative to environment.apiUrl. */
  protected abstract endpoints: { request: string; verify: string };
  /** Extra fields merged into the request body (e.g. mobile provider). */
  protected requestExtras(): Record<string, unknown> {
    return {};
  }

  /** In-memory mock store (dev only). Keyed by destination. */
  private static mockStore = new Map<string, MockRecord>();
  private static mockSeq = 0;

  get codeLength(): number {
    return this.cfg.codeLength;
  }
  get cooldownSeconds(): number {
    return this.cfg.resendCooldownSeconds;
  }
  get maxResendAttempts(): number {
    return this.cfg.maxResendAttempts;
  }
  get ttlSeconds(): number {
    return this.cfg.ttlSeconds;
  }

  request(destination: string, purpose?: string): Observable<OtpRequestResult> {
    if (this.cfg.mockMode) {
      return this.mockRequest(destination);
    }

    const url = `${environment.apiUrl}${this.endpoints.request}`;
    const body = {
      channel: this.channel,
      destination,
      purpose: purpose ?? 'inquiry-form',
      ...this.requestExtras(),
    };
    return this.http.post<OtpRequestResult>(url, body).pipe(
      map((res) => ({
        cooldownSeconds: this.cooldownSeconds,
        ...res,
        success: res?.success !== false,
      })),
      catchError((err) =>
        of<OtpRequestResult>({ success: false, error: err?.error?.error || err?.message || 'Could not send OTP' })
      )
    );
  }

  verify(destination: string, code: string, verificationId?: string): Observable<OtpVerificationResult> {
    if (this.cfg.mockMode) {
      return this.mockVerify(destination, code);
    }

    const url = `${environment.apiUrl}${this.endpoints.verify}`;
    const body = { channel: this.channel, destination, code, verificationId };
    return this.http.post<OtpVerificationResult>(url, body).pipe(
      map((res) => ({
        success: res?.success !== false,
        verified: !!res?.verified,
        token: res?.token,
        expired: res?.expired,
        attemptsRemaining: res?.attemptsRemaining,
        error: res?.error,
      })),
      catchError((err) =>
        of<OtpVerificationResult>({
          success: false,
          verified: false,
          error: err?.error?.error || err?.message || 'Verification failed',
        })
      )
    );
  }

  // --- Mock engine (dev only) ------------------------------------------------
  private mockRequest(destination: string): Observable<OtpRequestResult> {
    // 6-digit (or configured length) numeric code. NOT crypto-grade — dev only.
    const max = Math.pow(10, this.codeLength);
    const code = `${Math.floor(max + (destination.length * 7919 + ++AbstractOtpService.mockSeq * 104729) % max)}`.slice(-this.codeLength);
    const verificationId = `mock-${this.channel}-${AbstractOtpService.mockSeq}`;
    const expiresAt = this.now() + this.ttlSeconds * 1000;

    AbstractOtpService.mockStore.set(this.key(destination), {
      codeHash: simpleHash(code), // store hash, never the plain code
      verificationId,
      expiresAt,
      verifyAttempts: 0,
    });

    if (isDevMode()) {
      // eslint-disable-next-line no-console
      console.info(`[OTP:mock:${this.channel}] code for ${destination} → ${code}`);
      this.toast.info(`Dev OTP for ${this.channel}: ${code}`, 8000);
    }

    // Simulate network latency for realistic UX.
    return of<OtpRequestResult>({
      success: true,
      verificationId,
      expiresAt,
      cooldownSeconds: this.cooldownSeconds,
    }).pipe(delay(600));
  }

  private mockVerify(destination: string, code: string): Observable<OtpVerificationResult> {
    const record = AbstractOtpService.mockStore.get(this.key(destination));
    const respond = (r: OtpVerificationResult) => of(r).pipe(delay(500));

    if (!record) {
      return respond({ success: false, verified: false, error: 'No OTP requested for this destination' });
    }
    if (this.now() > record.expiresAt) {
      AbstractOtpService.mockStore.delete(this.key(destination));
      return respond({ success: true, verified: false, expired: true, error: 'OTP expired' });
    }
    record.verifyAttempts++;
    if (record.verifyAttempts > this.cfg.maxVerifyAttempts) {
      AbstractOtpService.mockStore.delete(this.key(destination));
      return respond({ success: false, verified: false, error: 'Too many attempts. Please request a new code.' });
    }
    if (simpleHash(code) !== record.codeHash) {
      return respond({
        success: true,
        verified: false,
        attemptsRemaining: Math.max(0, this.cfg.maxVerifyAttempts - record.verifyAttempts),
        error: 'Invalid OTP',
      });
    }

    // Success — invalidate the code (replay protection) and issue a token.
    AbstractOtpService.mockStore.delete(this.key(destination));
    return respond({
      success: true,
      verified: true,
      token: `mock-verified-${record.verificationId}-${simpleHash(destination)}`,
    });
  }

  private key(destination: string): string {
    return `${this.channel}:${destination.trim().toLowerCase()}`;
  }

  /** Date.now() is unavailable in some sandboxed contexts but fine at runtime. */
  private now(): number {
    return Date.now();
  }

  /** Exposed for tests / future queueing. */
  protected backoff(attempt: number): Observable<number> {
    return timer(this.cooldownSeconds * 1000 * attempt);
  }
}
