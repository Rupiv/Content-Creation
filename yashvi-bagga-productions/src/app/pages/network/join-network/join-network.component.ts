import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { AVAILABILITY_OPTIONS, EXPERIENCE_LEVELS, TALENT_CATEGORIES } from '../../../shared/models/taxonomy.model';
import { TalentProfile } from '../../../shared/models/talent-profile.model';
import { DocumentUpload } from '../../../shared/models/document-upload.model';

interface RegistrationRole {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-join-network',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ScrollAnimationDirective, SectionHeaderComponent, CaptchaComponent, RequirementTextareaComponent, EmailOtpComponent, MobileOtpComponent, FileUploadComponent, SkillTagsComponent],
  template: `
    <section class="relative min-h-[64vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Registration Portal</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">Join Our Creative & Professional Network</h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Register your talent, creative skillset or media expertise and open the door to premium collaborations, casting requests and future API-powered onboarding.
        </p>
      </div>
    </section>

    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Choose Your Path"
          title="Registration Cards"
          description="Select a role to open the preview modal and continue to the registration flow."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (role of roles; track role.slug) {
            <button
              type="button"
              class="registration-card rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-6 text-left transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25"
              appScrollAnimation
              animationType="fade-up"
              (click)="openPreview(role)"
            >
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl text-brand-gold">
                {{ role.icon }}
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ role.title }}</h3>
              <p class="text-brand-white/60 text-sm leading-6">{{ role.description }}</p>
            </button>
          }
        </div>
      </div>
    </section>

    @if (selectedRole()) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-brand-black/80 px-4 py-10 backdrop-blur-lg">
        <div class="relative w-full max-w-2xl rounded-[36px] border border-brand-gold/15 bg-brand-dark/95 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
          <button
            type="button"
            class="absolute right-5 top-5 h-10 w-10 rounded-full border border-brand-white/10 text-brand-white/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
            (click)="closePreview()"
            aria-label="Close preview"
          >
            ×
          </button>

          <p class="text-brand-gold text-xs uppercase tracking-[0.35em] mb-4">Preview Modal</p>
          <h2 class="text-3xl font-playfair text-brand-white mb-4">{{ selectedRole()?.title }}</h2>
          <p class="text-brand-white/65 leading-7 mb-6">{{ selectedRole()?.description }}</p>

          <div class="grid gap-3 sm:grid-cols-2 mb-8">
            <div class="rounded-[24px] border border-brand-white/10 bg-brand-black/70 p-4">
              <p class="text-brand-white font-medium mb-2">Future API integration</p>
              <p class="text-brand-white/55 text-sm leading-6">This flow is prepared for a backend registration service, CRM sync and automated follow-up.</p>
            </div>
            <div class="rounded-[24px] border border-brand-white/10 bg-brand-black/70 p-4">
              <p class="text-brand-white font-medium mb-2">Registration page</p>
              <p class="text-brand-white/55 text-sm leading-6">Continue to the page below to complete the form and save your role preference.</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <a
              [routerLink]="['/join-network']"
              [queryParams]="{ role: selectedRole()?.slug }"
              fragment="registration-form"
              class="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white"
            >
              Continue to Registration
            </a>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-6 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
              (click)="closePreview()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    }

    <section class="section-padding bg-brand-dark relative overflow-hidden" id="registration-form">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_28%)]"></div>
      <div class="relative max-w-5xl mx-auto">
        <app-section-header
          subtitle="Registration Form"
          title="Tell Us About Your Background"
          description="Share your role, experience and portfolio so we can keep you in the right pipeline."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <form [formGroup]="registrationForm" (ngSubmit)="submitForm()" class="glass-card p-8 md:p-12" appScrollAnimation animationType="fade-up">
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Full Name *</label>
              <input
                formControlName="name"
                type="text"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
              <input
                formControlName="email"
                type="email"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
              <div class="mt-2">
                <app-email-otp
                  formControlName="emailVerified"
                  [destination]="registrationForm.get('email')?.value || ''"
                  [destinationValid]="!!registrationForm.get('email')?.valid"
                  purpose="talent-registration"
                />
              </div>
            </div>

            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Mobile Number *</label>
              <input
                formControlName="phone"
                type="tel"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
              @if (registrationForm.get('phone')?.touched && registrationForm.get('phone')?.hasError('indianMobile')) {
                <p class="mt-1.5 text-brand-pink font-poppins text-xs">Enter a valid 10-digit Indian mobile number.</p>
              }
              <div class="mt-2">
                <app-mobile-otp
                  formControlName="mobileVerified"
                  [destination]="registrationForm.get('phone')?.value || ''"
                  [destinationValid]="!!registrationForm.get('phone')?.valid"
                  purpose="talent-registration"
                />
              </div>
            </div>

            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Role *</label>
              <select
                formControlName="role"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
              >
                <option value="" disabled>Select a role</option>
                @for (role of roles; track role.slug) {
                  <option [value]="role.slug">{{ role.title }}</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Portfolio / Profile Link</label>
              <input
                formControlName="portfolio"
                type="text"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="Instagram, website or portfolio"
              />
            </div>

            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Experience Level</label>
              <select
                formControlName="experience"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
              >
                <option value="" disabled>Select experience</option>
                @for (level of experienceLevels; track level.slug) {
                  <option [value]="level.slug">{{ level.label }}</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">City / Location</label>
              <input
                formControlName="location"
                type="text"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="e.g. Mumbai"
              />
            </div>
          </div>

          <!-- Skill tagging -->
          <div class="mt-6">
            <app-skill-tags formControlName="skills" label="Skills & Specialities" placeholder="Add a skill and press Enter…" />
          </div>

          <!-- Availability preferences -->
          <div class="mt-6">
            <label class="block text-brand-white/60 font-poppins text-sm mb-3">Availability Preferences</label>
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

          <!-- Resume upload -->
          <div class="mt-6">
            <app-file-upload formControlName="resume" label="Resume / CV"
              [accept]="['pdf','docx']" [maxSizeMb]="5" purpose="talent-resume" />
          </div>

          <div class="mt-6">
            <app-requirement-textarea
              formControlName="notes"
              label="Tell us about your work"
              [rows]="5"
              placeholder="Share your experience, interests and the kind of opportunities you want to explore..."
            />
          </div>

          <div class="mt-6">
            <app-captcha #captchaRef formControlName="captcha" action="talent_registration" />
          </div>

          @if (submitted()) {
            <div class="mt-6 rounded-[24px] border border-brand-gold/15 bg-brand-gold/10 p-5 text-brand-white/80 text-sm">
              Thanks — your registration is captured in the UI and ready to connect to a future API.
            </div>
          }

          <div class="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              [disabled]="registrationForm.invalid || submitting()"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              @if (submitting()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                Submitting…
              } @else {
                Submit Registration
              }
            </button>
            <a routerLink="/collaborations" class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-8 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
              Explore Collaborations
            </a>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class JoinNetworkComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly applications = inject(ApplicationService);

  @ViewChild('captchaRef') private captcha?: CaptchaComponent;

  selectedRole = signal<RegistrationRole | null>(null);
  submitted = signal(false);
  submitting = signal(false);
  availability = signal<string[]>([]);

  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly availabilityOptions = AVAILABILITY_OPTIONS;

  // The 12 Talent & Career Portal categories (Module 1), sourced from the
  // shared taxonomy so the portal and a future TMS share one vocabulary.
  roles: RegistrationRole[] = TALENT_CATEGORIES.map((category) => ({
    slug: category.slug,
    title: `${category.label} Registration`,
    description: category.description ?? '',
    icon: category.icon ?? '✨',
  }));

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, indianMobileValidator()]],
    role: ['', Validators.required],
    location: [''],
    portfolio: [''],
    experience: [''],
    skills: [[] as string[]],
    resume: [null as DocumentUpload | null],
    // Min/max (20–2000) is enforced by <app-requirement-textarea>.
    notes: ['', [Validators.required]],
    captcha: [''],
    emailVerified: [null, Validators.required],
    mobileVerified: [null, Validators.required],
  });

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Join Our Network | YASHVI BAGGA PRODUCTIONS',
      description: 'Register as talent, creator or media professional with YASHVI BAGGA PRODUCTIONS and join the premium network.',
      url: 'https://yashvibagga.com/join-network',
    });

    const roleFromQuery = this.route.snapshot.queryParamMap.get('role');
    const matchedRole = this.roles.find(role => role.slug === roleFromQuery);
    if (matchedRole) {
      this.selectedRole.set(matchedRole);
      this.registrationForm.patchValue({ role: matchedRole.slug });
    }
  }

  openPreview(role: RegistrationRole): void {
    this.selectedRole.set(role);
    this.registrationForm.patchValue({ role: role.slug });
  }

  closePreview(): void {
    this.selectedRole.set(null);
  }

  isAvailable(slug: string): boolean {
    return this.availability().includes(slug);
  }

  toggleAvailability(slug: string): void {
    this.availability.set(
      this.isAvailable(slug) ? this.availability().filter((s) => s !== slug) : [...this.availability(), slug],
    );
  }

  async submitForm(): Promise<void> {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.toast.error('Please complete all required fields before submitting.');
      return;
    }

    const verified = await this.captcha?.execute();
    if (verified === false) {
      return;
    }

    this.submitting.set(true);
    const loadingId = this.toast.loading('Submitting your registration…');

    const value = this.registrationForm.getRawValue();
    const profile: TalentProfile = {
      category: value.role ?? '',
      fullName: value.name ?? '',
      email: value.email ?? '',
      mobile: value.phone ?? '',
      location: value.location ?? undefined,
      experienceLevel: value.experience ?? '',
      skills: value.skills ?? [],
      availability: this.availability(),
      portfolioLinks: value.portfolio ? [value.portfolio] : [],
      resume: value.resume ?? null,
      about: value.notes ?? undefined,
    };

    this.applications.submitTalentProfile(profile).subscribe({
      next: () => {
        this.toast.update(loadingId, 'success', 'Thank you! Your registration has been received.');
        this.submitted.set(true);
        this.registrationForm.reset();
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
}
