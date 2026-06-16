import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/services/seo.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';
import { RequirementTextareaComponent } from '../../shared/components/requirement-textarea/requirement-textarea.component';
import { EmailOtpComponent } from '../../shared/components/email-otp/email-otp.component';
import { MobileOtpComponent } from '../../shared/components/mobile-otp/mobile-otp.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { SkillTagsComponent } from '../../shared/components/skill-tags/skill-tags.component';
import { StatusTimelineComponent } from '../../shared/components/status-timeline/status-timeline.component';
import { ToastService } from '../../shared/services/toast.service';
import { ApplicationService } from '../../shared/services/application.service';
import { indianMobileValidator } from '../../shared/validators/form.validators';
import { AVAILABILITY_OPTIONS, EXPERIENCE_LEVELS, TaxonomyOption } from '../../shared/models/taxonomy.model';
import { CastingApplication } from '../../shared/models/casting-application.model';
import { DocumentUpload } from '../../shared/models/document-upload.model';

/**
 * MODULE 2 — Casting Application System.
 *
 * A dedicated audition application workflow with seven sections (Personal,
 * Physical Profile, Acting Experience, Skills, Media Links, Portfolio Upload,
 * Availability) and the canonical casting status flow visualised up top.
 * Built additively on the existing brand UI + verification stack.
 */
@Component({
  selector: 'app-casting-application',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, ScrollAnimationDirective,
    SectionHeaderComponent, CaptchaComponent,
    RequirementTextareaComponent, EmailOtpComponent, MobileOtpComponent,
    FileUploadComponent, SkillTagsComponent, StatusTimelineComponent,
  ],
  template: `
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      </div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Casting Application</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">Apply for Casting & Auditions</h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Submit your casting profile for upcoming campaigns, films and brand productions. Every application moves through a clear, transparent review flow.
        </p>
      </div>
    </section>

    <!-- Status flow visualization (Module 8) -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="What Happens Next"
          title="Your Application Journey"
          description="The stages your casting application will move through after you submit."
          [titleGradient]="true"
          appScrollAnimation animationType="fade-up"
        />
        <app-status-timeline track="casting" current="submitted" />
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden" id="casting-form">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_28%)]"></div>
      <div class="relative max-w-5xl mx-auto">
        <app-section-header
          subtitle="Casting Application Form"
          title="Build Your Casting Profile"
          [titleGradient]="true"
          appScrollAnimation animationType="fade-up"
        />

        <form [formGroup]="form" (ngSubmit)="submit()" class="glass-card p-8 md:p-12 space-y-12" appScrollAnimation animationType="fade-up">
          <!-- 1. Personal Information -->
          <fieldset class="space-y-6">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">01 · Personal Information</legend>
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Full Name *</label>
                <input formControlName="fullName" type="text" class="form-input" placeholder="Your name" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
                <input formControlName="email" type="email" class="form-input" placeholder="your@email.com" />
                <div class="mt-2">
                  <app-email-otp formControlName="emailVerified"
                    [destination]="form.get('email')?.value || ''"
                    [destinationValid]="!!form.get('email')?.valid" purpose="casting-application" />
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
                    [destinationValid]="!!form.get('mobile')?.valid" purpose="casting-application" />
                </div>
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Date of Birth</label>
                <input formControlName="dateOfBirth" type="date" class="form-input" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Gender</label>
                <select formControlName="gender" class="form-input">
                  <option value="">Prefer not to say</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">City / Location</label>
                <input formControlName="location" type="text" class="form-input" placeholder="e.g. Mumbai" />
              </div>
            </div>
          </fieldset>

          <!-- 2. Physical Profile -->
          <fieldset class="space-y-6" formGroupName="physical">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">02 · Physical Profile</legend>
            <div class="grid gap-6 md:grid-cols-3">
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Height (cm)</label>
                <input formControlName="heightCm" type="number" class="form-input" placeholder="170" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Weight (kg)</label>
                <input formControlName="weightKg" type="number" class="form-input" placeholder="60" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Complexion</label>
                <input formControlName="complexion" type="text" class="form-input" placeholder="e.g. Wheatish" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Hair Colour</label>
                <input formControlName="hairColor" type="text" class="form-input" placeholder="e.g. Black" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Eye Colour</label>
                <input formControlName="eyeColor" type="text" class="form-input" placeholder="e.g. Brown" />
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Measurements</label>
                <input formControlName="measurements" type="text" class="form-input" placeholder="e.g. 32-28-34" />
              </div>
            </div>
          </fieldset>

          <!-- 3. Acting Experience -->
          <fieldset class="space-y-6">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">03 · Acting Experience</legend>
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Experience Level *</label>
                <select formControlName="experienceLevel" class="form-input">
                  <option value="" disabled>Select experience</option>
                  @for (level of experienceLevels; track level.slug) {
                    <option [value]="level.slug">{{ level.label }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-brand-white/60 font-poppins text-sm mb-2">Years Active</label>
                <input formControlName="yearsActive" type="number" class="form-input" placeholder="e.g. 3" />
              </div>
            </div>
            <app-skill-tags formControlName="languages" label="Languages You Can Act In" placeholder="Add a language…" />
            <app-requirement-textarea formControlName="credits" label="Notable Credits & Experience" [rows]="4"
              [min]="0" [required]="false"
              placeholder="List notable roles, films, ads, theatre or campaign credits…" />
          </fieldset>

          <!-- 4. Skills -->
          <fieldset class="space-y-4">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">04 · Skills</legend>
            <app-skill-tags formControlName="skills" label="Special Skills"
              placeholder="e.g. Dance, Combat, Singing, Accents…" />
          </fieldset>

          <!-- 5. Media Links -->
          <fieldset class="space-y-4">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">05 · Media Links</legend>
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Showreel / Social / Profile Links</label>
              <textarea formControlName="mediaLinks" rows="3" class="form-input resize-none"
                placeholder="One link per line — YouTube, Instagram, IMDb, Drive…"></textarea>
            </div>
          </fieldset>

          <!-- 6. Portfolio Upload -->
          <fieldset class="space-y-4">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">06 · Portfolio Upload</legend>
            <app-file-upload formControlName="portfolio" label="Headshots, Reels & Portfolio"
              [multiple]="true" [accept]="['jpg','png','pdf','zip','mp4']" [maxSizeMb]="25" purpose="casting-portfolio" />
          </fieldset>

          <!-- 7. Availability -->
          <fieldset class="space-y-4">
            <legend class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-2">07 · Availability</legend>
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
            <label class="flex items-center gap-3 text-brand-white/70 font-poppins text-sm">
              <input type="checkbox" formControlName="willingToTravel" class="h-4 w-4 accent-[#d4af37]" />
              I am willing to travel / relocate for shoots
            </label>
          </fieldset>

          <div>
            <app-captcha #captchaRef formControlName="captcha" action="casting_application" />
          </div>

          @if (submitted()) {
            <div class="rounded-[24px] border border-brand-gold/15 bg-brand-gold/10 p-5 text-brand-white/80 text-sm">
              Thank you — your casting application has been received and is now <span class="text-brand-gold">Submitted</span>. We will review it and update your status.
            </div>
          }

          <div class="flex flex-col sm:flex-row items-center gap-4">
            <button type="submit" [disabled]="form.invalid || submitting()"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white disabled:cursor-not-allowed disabled:opacity-50">
              @if (submitting()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                Submitting…
              } @else { Submit Application }
            </button>
            <a routerLink="/casting-services" class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-8 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
              Back to Casting Services
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
export class CastingApplicationComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seoService = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly applications = inject(ApplicationService);

  @ViewChild('captchaRef') private captcha?: CaptchaComponent;

  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly availabilityOptions = AVAILABILITY_OPTIONS as TaxonomyOption[];

  submitted = signal(false);
  submitting = signal(false);
  availability = signal<string[]>([]);

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, indianMobileValidator()]],
    dateOfBirth: [''],
    gender: [''],
    location: [''],
    physical: this.fb.group({
      heightCm: [null as number | null],
      weightKg: [null as number | null],
      complexion: [''],
      hairColor: [''],
      eyeColor: [''],
      measurements: [''],
    }),
    experienceLevel: ['', Validators.required],
    yearsActive: [null as number | null],
    languages: [[] as string[]],
    credits: [''],
    skills: [[] as string[]],
    mediaLinks: [''],
    portfolio: this.fb.control<DocumentUpload[]>([], { nonNullable: true }),
    willingToTravel: [false],
    captcha: [''],
    emailVerified: [null, Validators.required],
    mobileVerified: [null, Validators.required],
  });

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Casting Application | YASHVI BAGGA PRODUCTIONS',
      description: 'Apply for casting and auditions with YASHVI BAGGA PRODUCTIONS. Submit your personal, physical and acting profile for upcoming productions.',
      url: 'https://yashvibagga.com/casting-application',
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
    const loadingId = this.toast.loading('Submitting your casting application…');

    const v = this.form.getRawValue();
    const application: CastingApplication = {
      fullName: v.fullName ?? '',
      email: v.email ?? '',
      mobile: v.mobile ?? '',
      dateOfBirth: v.dateOfBirth ?? undefined,
      gender: v.gender ?? undefined,
      location: v.location ?? undefined,
      physical: {
        heightCm: v.physical?.heightCm ?? null,
        weightKg: v.physical?.weightKg ?? null,
        complexion: v.physical?.complexion ?? undefined,
        hairColor: v.physical?.hairColor ?? undefined,
        eyeColor: v.physical?.eyeColor ?? undefined,
        measurements: v.physical?.measurements ?? undefined,
      },
      experienceLevel: v.experienceLevel ?? '',
      yearsActive: v.yearsActive ?? null,
      credits: v.credits ?? undefined,
      languages: v.languages ?? [],
      skills: v.skills ?? [],
      mediaLinks: this.parseLinks(v.mediaLinks ?? ''),
      portfolio: v.portfolio ?? [],
      availability: this.availability(),
      willingToTravel: v.willingToTravel ?? false,
    };

    this.applications.submitCastingApplication(application).subscribe({
      next: () => {
        this.toast.update(loadingId, 'success', 'Thank you! Your casting application has been received.');
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
