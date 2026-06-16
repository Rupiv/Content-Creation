import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';
import { CaptchaComponent } from '../../../shared/components/captcha/captcha.component';
import { RequirementTextareaComponent } from '../../../shared/components/requirement-textarea/requirement-textarea.component';
import { EmailOtpComponent } from '../../../shared/components/email-otp/email-otp.component';
import { MobileOtpComponent } from '../../../shared/components/mobile-otp/mobile-otp.component';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { SkillTagsComponent } from '../../../shared/components/skill-tags/skill-tags.component';
import { ToastService } from '../../../shared/services/toast.service';
import { ApplicationService } from '../../../shared/services/application.service';
import { indianMobileValidator } from '../../../shared/validators/form.validators';
import {
  AVAILABILITY_OPTIONS, COMPENSATION_RANGES, ENGAGEMENT_MODELS,
  EXPERIENCE_LEVELS, SOFTWARE_OPTIONS, TaxonomyOption,
} from '../../../shared/models/taxonomy.model';
import { MediaProfessional } from '../../../shared/models/media-professional.model';
import { DocumentUpload } from '../../../shared/models/document-upload.model';

/**
 * MODULE 3 — Media Professional Registration.
 *
 * Dynamic registration for media/creative professionals capturing skills,
 * software expertise, work samples, portfolio links, compensation expectations
 * and the preferred engagement model. Reuses the verification + upload stack.
 */
@Component({
  selector: 'app-media-professional',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, ScrollAnimationDirective,
    SectionHeaderComponent, CaptchaComponent, RequirementTextareaComponent,
    EmailOtpComponent, MobileOtpComponent, FileUploadComponent, SkillTagsComponent,
  ],
  template: `
    <section class="relative min-h-[58vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      </div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Media Professional</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">Register as a Media Professional</h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          For editors, designers, motion artists, developers and creative specialists. Share your expertise, work samples and engagement preferences to join our professional roster.
        </p>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden" id="media-form">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_28%)]"></div>
      <div class="relative max-w-5xl mx-auto">
        <app-section-header
          subtitle="Professional Registration"
          title="Tell Us About Your Expertise"
          [titleGradient]="true"
          appScrollAnimation animationType="fade-up"
        />

        <form [formGroup]="form" (ngSubmit)="submit()" class="glass-card p-8 md:p-12 space-y-10" appScrollAnimation animationType="fade-up">
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Full Name *</label>
              <input formControlName="fullName" type="text" class="form-input" placeholder="Your name" />
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Primary Profession *</label>
              <input formControlName="profession" type="text" class="form-input" placeholder="e.g. Video Editor, Motion Designer" />
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
              <input formControlName="email" type="email" class="form-input" placeholder="your@email.com" />
              <div class="mt-2">
                <app-email-otp formControlName="emailVerified"
                  [destination]="form.get('email')?.value || ''"
                  [destinationValid]="!!form.get('email')?.valid" purpose="media-registration" />
              </div>
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Mobile Number *</label>
              <input formControlName="mobile" type="tel" class="form-input" placeholder="+91 98765 43210" />
              @if (form.get('mobile')?.touched && form.get('mobile')?.hasError('indianMobile')) {
                <p class="mt-1.5 text-brand-pink font-poppins text-xs">Enter a valid 10-digit Indian mobile number.</p>
              }
              <div class="mt-2">
                <app-mobile-otp formControlName="mobileVerified"
                  [destination]="form.get('mobile')?.value || ''"
                  [destinationValid]="!!form.get('mobile')?.valid" purpose="media-registration" />
              </div>
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">City / Location</label>
              <input formControlName="location" type="text" class="form-input" placeholder="e.g. Delhi" />
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Experience Level *</label>
              <select formControlName="experienceLevel" class="form-input">
                <option value="" disabled>Select experience</option>
                @for (level of experienceLevels; track level.slug) {
                  <option [value]="level.slug">{{ level.label }}</option>
                }
              </select>
            </div>
          </div>

          <app-skill-tags formControlName="skills" label="Skills *" placeholder="e.g. Color Grading, UI Design, 3D…" />
          <app-skill-tags formControlName="software" label="Software Expertise" [suggestions]="softwareOptions" placeholder="Add software…" />

          <div>
            <label class="block text-brand-white/60 font-poppins text-sm mb-2">Portfolio / Work Links</label>
            <textarea formControlName="portfolioLinks" rows="3" class="form-input resize-none"
              placeholder="One link per line — Behance, Dribbble, YouTube, GitHub, Drive…"></textarea>
          </div>

          <app-file-upload formControlName="workSamples" label="Work Samples"
            [multiple]="true" [accept]="['pdf','zip','jpg','png','mp4']" [maxSizeMb]="25" purpose="media-work-samples" />

          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Compensation Expectation *</label>
              <select formControlName="compensationExpectation" class="form-input">
                <option value="" disabled>Select range</option>
                @for (range of compensationRanges; track range.slug) {
                  <option [value]="range.slug">{{ range.label }}</option>
                }
              </select>
            </div>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Preferred Engagement Model *</label>
              <select formControlName="engagementModel" class="form-input">
                <option value="" disabled>Select model</option>
                @for (model of engagementModels; track model.slug) {
                  <option [value]="model.slug">{{ model.label }}</option>
                }
              </select>
            </div>
          </div>

          <div>
            <label class="block text-brand-white/60 font-poppins text-sm mb-3">Availability</label>
            <div class="flex flex-wrap gap-3">
              @for (option of availabilityOptions; track option.slug) {
                <button type="button"
                  class="rounded-full border px-4 py-2 text-sm font-poppins transition-colors"
                  [class.border-brand-gold]="isAvailable(option.slug)"
                  [class.text-brand-gold]="isAvailable(option.slug)"
                  [class.bg-brand-gold/10]="isAvailable(option.slug)"
                  [class.border-white/10]="!isAvailable(option.slug)"
                  [class.text-brand-white/60]="!isAvailable(option.slug)"
                  (click)="toggleAvailability(option.slug)"
                >{{ option.label }}</button>
              }
            </div>
          </div>

          <app-requirement-textarea formControlName="about" label="Professional Summary" [rows]="4"
            [min]="0" [required]="false"
            placeholder="Briefly describe your specialisation, notable clients and the kind of projects you want…" />

          <app-captcha #captchaRef formControlName="captcha" action="media_registration" />

          @if (submitted()) {
            <div class="rounded-[24px] border border-brand-gold/15 bg-brand-gold/10 p-5 text-brand-white/80 text-sm">
              Thank you — your professional registration has been received and is now <span class="text-brand-gold">Submitted</span>.
            </div>
          }

          <div class="flex flex-col sm:flex-row items-center gap-4">
            <button type="submit" [disabled]="form.invalid || submitting()"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white disabled:cursor-not-allowed disabled:opacity-50">
              @if (submitting()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                Submitting…
              } @else { Submit Registration }
            </button>
            <a routerLink="/join-network" class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-8 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
              Talent & Career Portal
            </a>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .form-input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      color: #fff;
      font-family: 'Poppins', sans-serif;
      font-size: 0.875rem;
      transition: border-color .2s ease;
    }
    .form-input:focus { outline: none; border-color: #d4af37; }
  `],
})
export class MediaProfessionalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seoService = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly applications = inject(ApplicationService);

  @ViewChild('captchaRef') private captcha?: CaptchaComponent;

  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly softwareOptions = SOFTWARE_OPTIONS;
  readonly compensationRanges = COMPENSATION_RANGES;
  readonly engagementModels = ENGAGEMENT_MODELS;
  readonly availabilityOptions = AVAILABILITY_OPTIONS as TaxonomyOption[];

  submitted = signal(false);
  submitting = signal(false);
  availability = signal<string[]>([]);

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    profession: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, indianMobileValidator()]],
    location: [''],
    experienceLevel: ['', Validators.required],
    skills: [[] as string[], [Validators.required, this.nonEmptyArray]],
    software: [[] as string[]],
    portfolioLinks: [''],
    workSamples: this.fb.control<DocumentUpload[]>([], { nonNullable: true }),
    compensationExpectation: ['', Validators.required],
    engagementModel: ['', Validators.required],
    about: [''],
    captcha: [''],
    emailVerified: [null, Validators.required],
    mobileVerified: [null, Validators.required],
  });

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Media Professional Registration | YASHVI BAGGA PRODUCTIONS',
      description: 'Register as a media or creative professional — share your skills, software expertise, work samples and engagement preferences.',
      url: 'https://yashvibagga.com/media-professional',
    });
  }

  isAvailable(slug: string): boolean {
    return this.availability().includes(slug);
  }

  toggleAvailability(slug: string): void {
    this.availability.set(
      this.isAvailable(slug) ? this.availability().filter((s) => s !== slug) : [...this.availability(), slug],
    );
  }

  private nonEmptyArray(control: { value: unknown }) {
    return Array.isArray(control.value) && control.value.length > 0 ? null : { required: true };
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Please complete all required fields before submitting.');
      return;
    }
    if ((await this.captcha?.execute()) === false) {
      return;
    }

    this.submitting.set(true);
    const loadingId = this.toast.loading('Submitting your registration…');

    const v = this.form.getRawValue();
    const pro: MediaProfessional = {
      fullName: v.fullName ?? '',
      profession: v.profession ?? '',
      email: v.email ?? '',
      mobile: v.mobile ?? '',
      location: v.location ?? undefined,
      experienceLevel: v.experienceLevel ?? '',
      skills: v.skills ?? [],
      software: v.software ?? [],
      portfolioLinks: this.parseLinks(v.portfolioLinks ?? ''),
      workSamples: v.workSamples ?? [],
      compensationExpectation: v.compensationExpectation ?? '',
      engagementModel: v.engagementModel ?? '',
      availability: this.availability(),
      about: v.about ?? undefined,
    };

    this.applications.submitMediaProfessional(pro).subscribe({
      next: () => {
        this.toast.update(loadingId, 'success', 'Thank you! Your registration has been received.');
        this.submitted.set(true);
        this.form.reset();
        this.availability.set([]);
        this.captcha?.reset();
        this.submitting.set(false);
      },
      error: () => {
        this.toast.update(loadingId, 'error', 'Something went wrong. Please try again shortly.');
        this.submitting.set(false);
      },
    });
  }

  private parseLinks(raw: string): string[] {
    return raw.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
  }
}
