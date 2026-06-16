import { Injectable, inject, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SmsMessage, SmsProvider, SmsResult } from '../models/notification.model';

interface SmsApiResponse {
  success?: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Provider-agnostic SMS gateway.
 *
 * The browser NEVER holds provider credentials. It selects a provider from
 * the environment and posts a normalized payload to a backend route; the
 * server holds the Twilio / MSG91 / Fast2SMS secrets and performs the real
 * send. This keeps the client production-safe and lets the provider be
 * switched purely via configuration.
 *
 * Features: configurable retry with backoff, structured logging, graceful
 * failure (never throws to the caller), and a queue-ready `send` boundary
 * that a future job/queue layer can wrap without changing call sites.
 */
@Injectable({ providedIn: 'root' })
export class SmsService {
  private readonly http = inject(HttpClient);
  private readonly config = environment.sms;

  get provider(): SmsProvider {
    return this.config.provider;
  }

  get isEnabled(): boolean {
    return this.config.enabled;
  }

  /** Dispatches a single SMS. Resolves to a result; never throws. */
  send(message: SmsMessage): Observable<SmsResult> {
    if (!this.isEnabled) {
      this.log('skipped', message, 'SMS disabled via config');
      return of(this.skip(message.to));
    }
    if (!message.to) {
      this.log('skipped', message, 'No recipient');
      return of(this.skip(''));
    }

    const url = `${environment.apiUrl}${this.config.endpoint}`;
    const body = {
      provider: this.provider,
      senderId: this.config.senderId,
      to: message.to,
      body: message.body,
      tag: message.tag ?? 'generic',
    };

    const { attempts, delayMs } = this.config.retry;

    return this.http.post<SmsApiResponse>(url, body).pipe(
      map((res): SmsResult => {
        if (res?.success === false) {
          throw new Error(res.error || 'Provider reported failure');
        }
        this.log('sent', message);
        return {
          success: true,
          to: message.to,
          provider: this.provider,
          messageId: res?.messageId,
        };
      }),
      // Exponential-ish backoff between attempts.
      retry({
        count: Math.max(0, attempts - 1),
        delay: (_err, retryCount) => timer(delayMs * retryCount),
      }),
      catchError((err) => {
        const reason = err?.message || err?.statusText || 'Unknown error';
        this.log('failed', message, reason);
        // Resolve with a failed result instead of erroring the pipeline so a
        // notification orchestrator can continue with other channels.
        return of<SmsResult>({
          success: false,
          to: message.to,
          provider: this.provider,
          error: reason,
        });
      })
    );
  }

  /** Convenience: send several messages, collecting all results. */
  sendMany(messages: SmsMessage[]): Observable<SmsResult[]> {
    const valid = messages.filter((m) => !!m.to);
    if (valid.length === 0) {
      return of([]);
    }
    // Fire independently; combine results.
    return new Observable<SmsResult[]>((subscriber) => {
      const results: SmsResult[] = [];
      let completed = 0;
      valid.forEach((m) => {
        this.send(m).subscribe((r) => {
          results.push(r);
          if (++completed === valid.length) {
            subscriber.next(results);
            subscriber.complete();
          }
        });
      });
    });
  }

  private skip(to: string): SmsResult {
    return { success: false, skipped: true, to, provider: this.provider };
  }

  private log(stage: 'sent' | 'failed' | 'skipped', message: SmsMessage, detail?: string): void {
    // Centralized logging hook — swap for a real logger/telemetry sink later.
    if (!isDevMode() && stage === 'sent') {
      return; // keep prod logs quiet for successful sends
    }
    const tag = `[SMS:${this.provider}:${message.tag ?? 'generic'}]`;
    // eslint-disable-next-line no-console
    console[stage === 'failed' ? 'warn' : 'log'](
      `${tag} ${stage}${detail ? ` — ${detail}` : ''}`,
      { to: message.to }
    );
  }
}

/** Re-export so future queue layers can also throw structured errors. */
export function smsError(reason: string): Observable<never> {
  return throwError(() => new Error(reason));
}
