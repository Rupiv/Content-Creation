import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OtpChannel } from '../models/otp.model';
import { AbstractOtpService } from './otp-base.service';

/**
 * Mobile OTP channel. Delivery is provider-agnostic — the configured
 * `sms.provider` (MSG91 / Twilio / Fast2SMS) is passed to the backend, which
 * holds the credentials and sends the code. No secrets live in the client.
 *
 * Future-ready: a WhatsApp OTP channel can be added as a sibling service that
 * extends AbstractOtpService and overrides `requestExtras()` with the channel.
 */
@Injectable({ providedIn: 'root' })
export class MobileOtpService extends AbstractOtpService {
  readonly channel: OtpChannel = 'mobile';
  protected endpoints = this.cfg.mobile;

  protected override requestExtras(): Record<string, unknown> {
    return { provider: environment.sms.provider, senderId: environment.sms.senderId };
  }
}
