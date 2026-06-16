/**
 * Shared contracts for the inquiry → notification pipeline.
 * These types are intentionally provider-agnostic so SMS, Email and CRM
 * channels can evolve independently.
 */

/** The five supported inquiry sources across the site. */
export type InquiryType =
  | 'contact'
  | 'consultation'
  | 'collaboration'
  | 'talent-registration'
  | 'manpower-requirement';

/** Normalized payload produced by any inquiry form. */
export interface InquiryPayload {
  type: InquiryType;
  /** Human-friendly label used in admin notifications (e.g. "Contact Form"). */
  label: string;
  name: string;
  mobile?: string;
  email?: string;
  service?: string;
  requirement?: string;
  /** Anything form-specific that should be persisted but isn't templated. */
  extra?: Record<string, unknown>;
}

export type SmsProvider = 'TWILIO' | 'MSG91' | 'FAST2SMS';

/** A single SMS to dispatch (recipient + body). */
export interface SmsMessage {
  to: string;
  body: string;
  /** Tag used for logging / queue routing. */
  tag?: 'customer' | 'admin' | string;
}

export interface SmsResult {
  success: boolean;
  to: string;
  provider: SmsProvider;
  messageId?: string;
  error?: string;
  /** True when the send was intentionally skipped (e.g. no recipient). */
  skipped?: boolean;
}

export type NotificationChannel = 'sms' | 'email' | 'crm';

export interface ChannelResult {
  channel: NotificationChannel;
  success: boolean;
  skipped?: boolean;
  detail?: string;
}

export interface NotificationResult {
  /** True when the inquiry was accepted (data saved), regardless of channels. */
  accepted: boolean;
  channels: ChannelResult[];
}
