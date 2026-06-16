import { SmsProvider } from './notification.model';

export type OtpChannel = 'email' | 'mobile';

/** Payload sent to request a new OTP. */
export interface OtpRequest {
  channel: OtpChannel;
  /** Email address or mobile number. */
  destination: string;
  /** Mobile provider (mobile channel only). */
  provider?: SmsProvider;
  /** Context tag, e.g. 'contact-form' — useful for backend analytics. */
  purpose?: string;
}

/** Result of an OTP request (code generated + delivered). */
export interface OtpRequestResult {
  success: boolean;
  /** Opaque server reference used to verify + guard against replay. */
  verificationId?: string;
  /** Epoch ms when the OTP expires. */
  expiresAt?: number;
  /** Seconds the client must wait before resending. */
  cooldownSeconds?: number;
  /** Remaining resend attempts before lockout. */
  attemptsRemaining?: number;
  error?: string;
}

/** Payload sent to verify a user-entered OTP. */
export interface OtpVerification {
  channel: OtpChannel;
  destination: string;
  code: string;
  verificationId?: string;
}

/** Result of an OTP verification attempt. */
export interface OtpVerificationResult {
  success: boolean;
  verified: boolean;
  /** Signed proof of verification, submitted alongside the form. */
  token?: string;
  /** True when the OTP had already expired. */
  expired?: boolean;
  attemptsRemaining?: number;
  error?: string;
}

/** Normalized reCAPTCHA result passed around the app. */
export interface CaptchaResponse {
  token: string | null;
  version: 'v2' | 'v3';
  action?: string;
  /** Epoch ms the token was obtained (tokens are short-lived). */
  obtainedAt?: number;
}
