import { Injectable } from '@angular/core';
import { OtpChannel } from '../models/otp.model';
import { AbstractOtpService } from './otp-base.service';

/**
 * Email OTP channel. Production posts to the configured email-OTP endpoints;
 * the backend generates, emails and verifies the code.
 *
 * Future-ready: an email-notification provider can be layered on the same
 * backend route without touching the client.
 */
@Injectable({ providedIn: 'root' })
export class EmailOtpService extends AbstractOtpService {
  readonly channel: OtpChannel = 'email';
  protected endpoints = this.cfg.email;
}
