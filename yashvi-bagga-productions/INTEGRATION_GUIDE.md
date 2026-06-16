# Inquiry Enhancements — Integration Guide

This guide documents the **additive** enhancement layer added to the Yashvi Bagga
Productions site: reusable CAPTCHA, an SMS/notification service layer, a
"Describe Your Requirement" field, toasts, and form validation helpers.

Nothing in the existing business logic, routing, layouts, or animations was
removed or rewritten. Every feature is opt-in per form.

---

## 1. What was added

### New shared building blocks
| File | Purpose |
| --- | --- |
| `src/app/shared/components/captcha/captcha.component.ts` | Reusable reCAPTCHA control (v3 + v2 fallback), implements `ControlValueAccessor`. |
| `src/app/shared/services/captcha.service.ts` | Lazy SDK loader + v3/v2 execution, SSR-safe. |
| `src/app/shared/components/requirement-textarea/requirement-textarea.component.ts` | "Describe Your Requirement" textarea with live counter + min/max validation. |
| `src/app/shared/components/toast/toast-container.component.ts` | Global toast renderer (mounted once in `app.component`). |
| `src/app/shared/services/toast.service.ts` | Signal-based toast store (`success` / `error` / `info` / `loading`). |
| `src/app/shared/services/sms.service.ts` | Provider-agnostic SMS gateway (Twilio / MSG91 / Fast2SMS) with retry + logging. |
| `src/app/shared/services/notification.service.ts` | Orchestrates Save → SMS → Email (future) → CRM (future). |
| `src/app/shared/models/notification.model.ts` | Shared types (`InquiryPayload`, `SmsMessage`, results). |
| `src/app/shared/validators/form.validators.ts` | `indianMobileValidator()` + `normalizeIndianMobile()`. |

### Touched (additively) existing files
- `src/environments/environment.ts` / `environment.prod.ts` — added `recaptcha`, `sms`, `notifications` config blocks.
- `src/app/app.config.ts` — added `provideHttpClient(withFetch())` (SSR-safe).
- `src/app/app.component.ts` — mounted `<app-toast-container />`.
- `contact`, `collaborations`, `join-network` components — wired captcha, requirement field, toasts, notifications.

---

## 2. Configuration

All config lives in the environment files. **No secrets are stored in the
frontend** — site keys are public and provider credentials live on the backend.

```ts
recaptcha: {
  enabled: true,
  version: 'v3',      // 'v3' (preferred) | 'v2' (checkbox fallback)
  v3SiteKey: '...',   // public site key
  v2SiteKey: '...',   // public site key for the checkbox fallback
  minScore: 0.5,      // informational; enforce the real threshold server-side
},
sms: {
  enabled: true,
  provider: 'MSG91',  // 'TWILIO' | 'MSG91' | 'FAST2SMS'
  endpoint: '/notifications/sms',  // appended to apiUrl
  adminMobile: '...', // receives "New inquiry received from ..." alerts
  senderId: 'YBGPRO',
  retry: { attempts: 3, delayMs: 800 },
},
notifications: { sms: true, email: false, crm: false },
```

> **Dev mode:** if `v3SiteKey` / `v2SiteKey` are empty, the captcha runs in a
> pass-through "disabled" state so forms remain usable locally. Production must
> set real keys to actually enforce verification.

---

## 3. Backend contract (required for live SMS)

The frontend never holds provider secrets. It POSTs a normalized payload; the
server selects the credentials for the chosen provider and performs the send.

**`POST {apiUrl}/notifications/sms`**
```jsonc
// request
{ "provider": "MSG91", "senderId": "YBGPRO", "to": "98XXXXXXXX", "body": "…", "tag": "customer" }
// response
{ "success": true, "messageId": "abc123" }   // or { "success": false, "error": "…" }
```

The server should also **verify the reCAPTCHA token** (sent with the saved
inquiry) against Google's `siteverify` endpoint using the *secret* key and
reject low scores.

Other (optional / future-ready) routes the orchestrator already calls when
enabled: `POST {apiUrl}/inquiries` (persist), `POST {apiUrl}/notifications/email`,
`POST {apiUrl}/integrations/crm`.

> Until these routes exist, submissions still succeed — channels fail
> gracefully and are logged; the user still sees a success toast.

---

## 4. Adding the features to a NEW form

```ts
// component.ts
import { CaptchaComponent } from 'shared/components/captcha/captcha.component';
import { RequirementTextareaComponent } from 'shared/components/requirement-textarea/requirement-textarea.component';
import { ToastService } from 'shared/services/toast.service';
import { NotificationService } from 'shared/services/notification.service';
import { indianMobileValidator } from 'shared/validators/form.validators';
import { InquiryPayload } from 'shared/models/notification.model';

@Component({
  imports: [/* … */, ReactiveFormsModule, CaptchaComponent, RequirementTextareaComponent],
})
export class MyFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private notifications = inject(NotificationService);
  @ViewChild('captchaRef') private captcha?: CaptchaComponent;
  submitting = signal(false);

  form = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(2)]],
    mobile:   ['', [Validators.required, indianMobileValidator()]],
    email:    ['', [Validators.required, Validators.email]],
    service:  ['', Validators.required],
    requirement: ['', [Validators.required]], // 20–2000 enforced by the component
    captcha:  [''],
  });

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); this.toast.error('Please complete all required fields.'); return; }
    if ((await this.captcha?.execute()) === false) return;   // captcha gate

    this.submitting.set(true);
    const id = this.toast.loading('Submitting…');
    const payload: InquiryPayload = {
      type: 'manpower-requirement', label: 'Manpower Requirement',
      name: this.form.value.name!, mobile: this.form.value.mobile!,
      email: this.form.value.email!, service: this.form.value.service!,
      requirement: this.form.value.requirement!,
    };
    this.notifications.notify(payload).subscribe({
      next: () => { this.toast.update(id, 'success', 'Thank you! We will contact you shortly.'); this.form.reset(); this.captcha?.reset(); this.submitting.set(false); },
      error: () => { this.toast.update(id, 'error', 'Something went wrong. Please try again.'); this.submitting.set(false); },
    });
  }
}
```

```html
<!-- template -->
<app-requirement-textarea formControlName="requirement" label="Describe Your Requirement" />
<app-captcha #captchaRef formControlName="captcha" action="manpower" />
<button type="submit" [disabled]="form.invalid || submitting()">
  {{ submitting() ? 'Submitting…' : 'Submit' }}
</button>
```

That's the entire pattern — it works with standalone components, lazy-loaded
routes, and Reactive Forms, with no code duplication.

---

## 5. Component reference

### `<app-requirement-textarea>`
| Input | Default | Notes |
| --- | --- | --- |
| `label` | `"Describe Your Requirement"` | Associated `<label>`. |
| `min` | `20` | Minimum characters. |
| `max` | `2000` | Maximum characters; counter turns pink when exceeded. |
| `rows` | `5` | Textarea rows. |
| `required` | `true` | Adds a `required` error when empty. |
| `placeholder` | (project default) | — |

Emits min/max/required validation through `NG_VALIDATORS`, shows a live
`245 / 2000 characters` counter, and is keyboard/`aria` accessible.

### `<app-captcha>`
| Input | Default | Notes |
| --- | --- | --- |
| `action` | `'submit'` | reCAPTCHA v3 action label. |

Public methods: `execute(): Promise<boolean>` (submit gate) and `reset()`.
Works as a form control whose value is the verified token.

### `ToastService`
`success(msg)`, `error(msg)`, `info(msg)`, `loading(msg) → id`,
`update(id, type, msg)`, `dismiss(id)`.

---

## 6. Email + Mobile OTP verification

Adds verified-email and verified-mobile gates plus the existing CAPTCHA. A form
can submit **only** when: email verified ✓, mobile verified ✓, captcha valid ✓,
and the rest of the form is valid — the submit button stays disabled otherwise.

### New pieces
| File | Purpose |
| --- | --- |
| `shared/components/email-otp/email-otp.component.ts` | Email OTP control (Verify Email → code → ✓ Email Verified). |
| `shared/components/mobile-otp/mobile-otp.component.ts` | Mobile OTP control (Send OTP → code → ✓ Mobile Number Verified). |
| `shared/components/otp-control.base.ts` | Shared logic (request/verify/resend/timer/attempts/CVA) — no duplication. |
| `shared/services/email-otp.service.ts` | Email channel. |
| `shared/services/mobile-otp.service.ts` | Mobile channel (provider-agnostic delivery). |
| `shared/services/otp-base.service.ts` | Abstract service + dev mock engine. |
| `shared/models/otp.model.ts` | `OtpRequest`, `OtpVerification`, `OtpVerificationResult`, `CaptchaResponse`. |
| `shared/utils/hash.util.ts` | Hash used so even mock codes are never stored in plain text. |

### How it works
- Each OTP control is a `ControlValueAccessor`; its **value is the verification
  token** (null until verified). Bind it to a `Validators.required` control and
  the submit gate is automatic:
  ```ts
  emailVerified: [null, Validators.required],
  mobileVerified: [null, Validators.required],
  ```
  ```html
  <app-email-otp formControlName="emailVerified"
    [destination]="form.get('email')?.value || ''"
    [destinationValid]="!!form.get('email')?.valid" purpose="contact-form" />
  <app-mobile-otp formControlName="mobileVerified"
    [destination]="form.get('phone')?.value || ''"
    [destinationValid]="!!form.get('phone')?.valid" purpose="contact-form" />
  ```
- Editing the email/mobile after verifying automatically **resets** that
  verification (you must re-verify the new value).
- UX built in: loading spinners, success/error toasts (`Sending OTP…`,
  `OTP Sent Successfully`, `Invalid OTP`, `OTP Expired`, `Email Verified`,
  `Mobile Number Verified`), a 60-second resend countdown, and a resend-attempt
  cap (`maxResendAttempts`).

### Dev mock mode
With `environment.otp.mockMode = true` (dev default), codes are generated
locally and surfaced via a toast + `console.info` so the flow is fully testable
without a backend. **Mock is OFF in `environment.prod.ts`** — production traffic
goes to the real endpoints. Even the mock stores only a hash of the code.

### Backend contract (production)
The server owns code generation, **hashed** storage, 5-minute expiry, rate
limiting, max-attempts and replay protection (Feature 6).

```jsonc
// POST {apiUrl}/otp/email/request   |   POST {apiUrl}/otp/mobile/request
// request (mobile also includes provider + senderId from sms config)
{ "channel": "mobile", "destination": "98XXXXXXXX", "purpose": "contact-form", "provider": "MSG91", "senderId": "YBGPRO" }
// response
{ "success": true, "verificationId": "srv-abc", "expiresAt": 1730000000000, "cooldownSeconds": 60 }

// POST {apiUrl}/otp/email/verify    |   POST {apiUrl}/otp/mobile/verify
// request
{ "channel": "email", "destination": "a@b.com", "code": "123456", "verificationId": "srv-abc" }
// response
{ "success": true, "verified": true, "token": "<signed-proof>" }      // or
{ "success": true, "verified": false, "expired": true }               // expired
{ "success": true, "verified": false, "attemptsRemaining": 3 }        // wrong code
```

Submit the returned `token` values with the form so the backend can confirm the
inquiry was verified (defends against client tampering).

### Future-ready (Feature 8)
- **WhatsApp OTP**: add a sibling service extending `AbstractOtpService` that
  overrides `requestExtras()` with the WhatsApp channel — no UI change.
- **Email notifications / CRM / Lead Mgmt / Admin dashboard**: already scaffolded
  via `NotificationService` (SMS live; email + CRM are toggled stubs).

---

## 7. Verification checklist
- [x] `npm run build` compiles cleanly (no new errors).
- [x] SSR-safe: all browser APIs guarded with `isPlatformBrowser`.
- [x] Existing fields, routes, layouts, and animations unchanged (Collaboration gained a mobile field per the strict-enforcement decision).
- [x] Submit gated on email + mobile verified + captcha + form validity.
- [ ] Set production reCAPTCHA site keys in `environment.prod.ts`.
- [ ] Implement backend routes: `/notifications/sms`, `/otp/{email,mobile}/{request,verify}` (+ reCAPTCHA `siteverify`).
- [ ] Confirm `environment.prod.ts` has `otp.mockMode = false`.
- [ ] Set `sms.adminMobile`.

---

## 8. Business workflow modules (additive)

A second additive layer adds end-to-end applicant/requirement workflows. No
existing UI, branding, routes, or animations were changed — everything below is
new files plus appended nav links and one new home section.

### New routes
| Path | Component | Module |
| --- | --- | --- |
| `/join-network` (extended) | `JoinNetworkComponent` | 1 — Talent & Career Portal (12 categories, resume upload, skill tags, availability) |
| `/casting-application` | `CastingApplicationComponent` | 2 — Casting Application System |
| `/media-professional` | `MediaProfessionalComponent` | 3 — Media Professional Registration |
| `/manpower-requirement` | `ManpowerRequirementComponent` | 4 — Manpower Requirement Portal (6-step wizard) |
| `/our-process` | `BusinessProcessComponent` | 7 — Business Process Visualization |

### New reusable building blocks
| File | Module |
| --- | --- |
| `shared/components/file-upload/file-upload.component.ts` | 5 — File Upload Center (drag&drop, preview, progress, validation, size limits; PDF/DOCX/JPG/PNG/ZIP/MP4) |
| `shared/components/skill-tags/skill-tags.component.ts` | skill / software / language tagging (CVA → `string[]`) |
| `shared/components/status-timeline/status-timeline.component.ts` | 8 — status flow visualization |
| `shared/services/file-upload.service.ts` | 5/10 — SSR-safe upload (mock progress in dev, HttpClient progress events in prod) |
| `shared/services/application.service.ts` | 10 — single submit/read seam for a future ATS / CRM / Admin Dashboard |

### Admin-ready models (Modules 8 & 9)
`shared/models/` now exports `ApplicationStatus` + `FLOWS` (status architecture),
`taxonomy.model.ts` (categories, skills, software, industries, engagement models),
and the `TalentProfile`, `CastingApplication`, `MediaProfessional`,
`OutsourcingRequirement` and `DocumentUpload` records. A barrel (`models/index.ts`)
re-exports the full surface.

### Home section (Module 6)
`pages/home/sections/industries.component.ts` ("Industries We Serve") is mounted
in `HomeComponent` between the Services and Core Team sections.

### Backend contract (future)
`ApplicationService` best-effort POSTs typed records to
`{apiUrl}/{talent-profiles | casting-applications | media-professionals | outsourcing-requirements}`
and reads status from `{apiUrl}/{resource}/{id}/status`. `FileUploadService`
streams to `{apiUrl}/uploads` (multipart) and expects `{ id, url }` back. Until
these exist, every form still succeeds (channels fail gracefully; uploads use a
dev mock), so the public site is fully usable without a backend.
