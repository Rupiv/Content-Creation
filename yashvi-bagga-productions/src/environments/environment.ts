export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/api',
  siteUrl: 'http://localhost:4200',

  /**
   * Google reCAPTCHA configuration.
   * Site keys are PUBLIC values and safe to ship to the browser.
   * Leave keys empty to run forms in "captcha-optional" dev mode.
   */
  recaptcha: {
    enabled: true,
    version: 'v3' as 'v3' | 'v2',
    v3SiteKey: '', // reCAPTCHA v3 site key (preferred)
    v2SiteKey: '', // reCAPTCHA v2 checkbox site key (fallback)
    minScore: 0.5, // informational; score is enforced server-side
  },

  /**
   * SMS notification configuration.
   * Provider-agnostic: the browser only chooses a provider and posts a
   * normalized payload to a backend route. Provider SECRETS live on the
   * server and are NEVER placed here.
   */
  sms: {
    enabled: true,
    provider: 'MSG91' as 'TWILIO' | 'MSG91' | 'FAST2SMS',
    endpoint: '/notifications/sms', // appended to apiUrl
    adminMobile: '', // E.164 / 10-digit admin number for inbound alerts
    senderId: 'YBGPRO',
    retry: { attempts: 3, delayMs: 800 },
  },

  /**
   * Notification channels toggled per environment. SMS is live;
   * email and CRM are wired as future-ready providers.
   */
  notifications: {
    sms: true,
    email: false,
    crm: false,
  },

  /**
   * OTP verification (email + mobile).
   *
   * OTP generation, hashing, expiry and rate limiting are SERVER-SIDE
   * responsibilities — the client only requests a code and submits the
   * user's entry for verification.
   *
   * `mockMode` simulates the full flow locally (codes surfaced via toast +
   * console) so forms are testable before the backend exists. It is DEV-ONLY
   * and MUST stay false in production (see environment.prod.ts).
   */
  otp: {
    enabled: true,
    mockMode: true,
    codeLength: 6,
    ttlSeconds: 300, // 5-minute OTP expiry
    resendCooldownSeconds: 60,
    maxResendAttempts: 3,
    maxVerifyAttempts: 5,
    // Mobile OTP delivery reuses the provider configured under `sms.provider`.
    email: { request: '/otp/email/request', verify: '/otp/email/verify' },
    mobile: { request: '/otp/mobile/request', verify: '/otp/mobile/verify' },
  },
};
