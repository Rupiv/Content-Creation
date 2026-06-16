import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  ChannelResult,
  InquiryPayload,
  NotificationResult,
  SmsMessage,
} from '../models/notification.model';
import { SmsService } from './sms.service';
import { normalizeIndianMobile } from '../validators/form.validators';

const CUSTOMER_TEMPLATE =
  'Thank you for contacting YASHVI BAGGA PRODUCTIONS. Our team has received your request and will contact you shortly.';

const adminTemplate = (name: string, mobile: string): string =>
  `New inquiry received from ${name} (${mobile})`;

/**
 * Central notification orchestrator.
 *
 *   NotificationService
 *     ├─ SMS Provider   (live — via SmsService)
 *     ├─ Email Provider (future-ready stub)
 *     └─ CRM Provider   (future-ready stub)
 *
 * After a successful form submission the flow is:
 *   1. Save form data        (best-effort POST to the backend)
 *   2. Trigger SMS           (customer + admin)
 *   3. Trigger Email         (future)
 *   4. Trigger CRM sync      (future)
 *
 * Channels run independently and failures are isolated, so one channel being
 * down (or no backend at all in local dev) never breaks the submission.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly sms = inject(SmsService);
  private readonly channels = environment.notifications;

  /**
   * Run the full notification flow for an inquiry. Always resolves; the
   * returned result reports per-channel outcomes.
   */
  notify(payload: InquiryPayload): Observable<NotificationResult> {
    // Step 1: persist (best-effort — never blocks notifications/UX).
    this.saveInquiry(payload);

    // Step 2-4: dispatch channels in parallel.
    const tasks: Observable<ChannelResult>[] = [
      this.dispatchSms(payload),
      this.dispatchEmail(payload),
      this.dispatchCrm(payload),
    ];

    return forkJoin(tasks).pipe(
      map((channels) => ({ accepted: true, channels }))
    );
  }

  // --- Step 1: persistence ---------------------------------------------------
  private saveInquiry(payload: InquiryPayload): void {
    this.http
      .post(`${environment.apiUrl}/inquiries`, payload)
      .pipe(catchError(() => of(null)))
      .subscribe(); // fire-and-forget; backend optional during development
  }

  // --- Step 2: SMS -----------------------------------------------------------
  private dispatchSms(payload: InquiryPayload): Observable<ChannelResult> {
    if (!this.channels.sms) {
      return of({ channel: 'sms', success: false, skipped: true, detail: 'SMS channel disabled' });
    }

    const messages: SmsMessage[] = [];

    const customerMobile = normalizeIndianMobile(payload.mobile);
    if (customerMobile) {
      messages.push({ to: customerMobile, body: CUSTOMER_TEMPLATE, tag: 'customer' });
    }

    const adminMobile = normalizeIndianMobile(environment.sms.adminMobile);
    if (adminMobile) {
      const mobileLabel = payload.mobile || customerMobile || 'N/A';
      messages.push({ to: adminMobile, body: adminTemplate(payload.name, mobileLabel), tag: 'admin' });
    }

    if (messages.length === 0) {
      return of({ channel: 'sms', success: false, skipped: true, detail: 'No SMS recipients' });
    }

    return this.sms.sendMany(messages).pipe(
      map((results) => {
        const sent = results.filter((r) => r.success).length;
        const allSkipped = results.every((r) => r.skipped);
        return {
          channel: 'sms' as const,
          success: sent > 0,
          skipped: allSkipped,
          detail: `${sent}/${results.length} SMS delivered`,
        };
      }),
      catchError((err) =>
        of({ channel: 'sms' as const, success: false, detail: err?.message || 'SMS dispatch failed' })
      )
    );
  }

  // --- Step 3: Email (future-ready) -----------------------------------------
  private dispatchEmail(payload: InquiryPayload): Observable<ChannelResult> {
    if (!this.channels.email) {
      return of({ channel: 'email', success: false, skipped: true, detail: 'Email channel not enabled' });
    }
    // Future: POST to `${apiUrl}/notifications/email` with a provider-agnostic
    // payload, mirroring the SMS service design.
    return this.http
      .post(`${environment.apiUrl}/notifications/email`, payload)
      .pipe(
        map(() => ({ channel: 'email' as const, success: true })),
        catchError((err) =>
          of({ channel: 'email' as const, success: false, detail: err?.message || 'Email failed' })
        )
      );
  }

  // --- Step 4: CRM sync (future-ready) --------------------------------------
  private dispatchCrm(payload: InquiryPayload): Observable<ChannelResult> {
    if (!this.channels.crm) {
      return of({ channel: 'crm', success: false, skipped: true, detail: 'CRM channel not enabled' });
    }
    // Future: push the lead into the CRM via a backend integration route.
    return this.http
      .post(`${environment.apiUrl}/integrations/crm`, payload)
      .pipe(
        map(() => ({ channel: 'crm' as const, success: true })),
        catchError((err) =>
          of({ channel: 'crm' as const, success: false, detail: err?.message || 'CRM sync failed' })
        )
      );
  }
}
