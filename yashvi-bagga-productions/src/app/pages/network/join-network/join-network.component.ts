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

    <!-- CAREER OPPORTUNITIES — INTRO -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_30%)]"></div>
      <div class="relative max-w-5xl mx-auto">
        <app-section-header
          subtitle="Career Opportunities"
          title="Build Your Future with Yashvi Bagga Productions"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />
        <div class="mt-10 space-y-6 max-w-4xl mx-auto text-brand-white/65 font-poppins leading-8" appScrollAnimation animationType="fade-up">
          <p>At Yashvi Bagga Productions, we believe that exceptional organizations are built by exceptional people. Our success is driven by passionate professionals, creative thinkers, skilled specialists, and dedicated individuals who share our commitment to excellence, innovation, and integrity.</p>
          <p>As a multidisciplinary organization working across media, entertainment, digital marketing, branding, professional training, event management, talent acquisition, and creative communications, we are always interested in connecting with talented individuals who are eager to learn, grow, and contribute to meaningful projects.</p>
          <p>Whether you are an experienced professional, a creative artist, a technical expert, a trainer, a marketing specialist, or a recent graduate looking to begin your career, we welcome your interest in becoming a part of our growing network.</p>
        </div>
      </div>
    </section>

    <!-- OPPORTUNITIES WE FREQUENTLY EXPLORE -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Roles & Disciplines"
          title="Opportunities We Frequently Explore"
          description="We periodically engage professionals across a wide range of disciplines."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          @for (role of careerOpportunities; track role; let i = $index) {
            <div
              class="flex items-center gap-3 rounded-[20px] border border-brand-white/10 bg-brand-dark/70 px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="(i % 3) * 80"
            >
              <span class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              </span>
              <span class="text-brand-white/75 font-poppins text-sm">{{ role }}</span>
            </div>
          }
        </div>

        <div class="mt-12 max-w-4xl mx-auto space-y-5 text-center text-brand-white/60 font-poppins leading-8" appScrollAnimation animationType="fade-up">
          <p>We are continuously expanding our network of talented professionals and would be delighted to receive your application for consideration against future opportunities.</p>
          <p>Your profile will be carefully reviewed and maintained in our talent database. As suitable positions, projects, or assignments arise that match your qualifications, skills, and experience, our team may reach out to you for further discussions.</p>
        </div>
      </div>
    </section>

    <!-- WHY JOIN -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(212,175,55,0.08),_transparent_30%)]"></div>
      <div class="relative max-w-6xl mx-auto">
        <app-section-header
          subtitle="The Advantage"
          title="Why Join Yashvi Bagga Productions?"
          description="Working with Yashvi Bagga Productions offers the opportunity to:"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 mt-12">
          @for (point of whyJoinPoints; track point.text; let i = $index) {
            <div
              class="flex gap-5 rounded-[24px] border border-brand-white/10 bg-brand-black/60 p-7 transition-all duration-500 hover:border-brand-gold/30"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 90"
            >
              <div class="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl">{{ point.icon }}</div>
              <p class="text-brand-white/70 font-poppins text-sm leading-7">{{ point.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- SUBMIT YOUR PROFILE / JOIN TALENT NETWORK -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.06),_transparent_28%)]"></div>
      <div class="relative max-w-6xl mx-auto">
        <app-section-header
          subtitle="How To Apply"
          title="Submit Your Profile"
          description="If you are passionate about creativity, innovation, excellence, and making a meaningful impact, we encourage you to share your profile with us."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-8 lg:grid-cols-2 items-start mt-12">
          <div class="rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-8 md:p-10" appScrollAnimation animationType="fade-up">
            <p class="text-brand-white/70 font-poppins text-sm mb-6">Please send us:</p>
            <ul class="space-y-4">
              @for (item of submissionItems; track item) {
                <li class="flex items-start gap-3">
                  <svg class="w-4 h-4 mt-1 flex-shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  <span class="text-brand-white/75 font-poppins text-sm leading-7">{{ item }}</span>
                </li>
              }
            </ul>
            <a
              routerLink="/join-network"
              fragment="registration-form"
              class="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white"
            >
              Submit Your Profile
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>

          <div class="space-y-6" appScrollAnimation animationType="fade-up">
            <div class="rounded-[30px] border border-brand-gold/15 bg-gradient-to-br from-brand-gold/10 to-transparent p-8 md:p-10">
              <h3 class="text-2xl font-playfair text-brand-white mb-4">Join Our Talent Network</h3>
              <p class="text-brand-white/65 font-poppins text-sm leading-7 mb-4">At Yashvi Bagga Productions, we are not just building a workforce—we are building a community of professionals who are passionate about creativity, excellence, collaboration, and innovation.</p>
              <p class="text-brand-white/65 font-poppins text-sm leading-7">We look forward to connecting with talented individuals who share our vision and aspire to grow with us as we continue to expand our services and create new opportunities across India.</p>
            </div>
            <p class="px-2 text-brand-white/55 font-poppins text-sm leading-7">We value every application and appreciate your interest in becoming part of the Yashvi Bagga Productions family. While we may not be able to respond to every submission immediately, each profile is reviewed and retained for consideration as future opportunities become available.</p>
            <p class="px-2 text-brand-gold font-playfair text-lg">Your Next Opportunity May Begin Here.</p>
          </div>
        </div>
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
            <!-- Not part of PDF requirement — Explore Collaborations CTA commented out -->
            <!-- <a routerLink="/collaborations" class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-8 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
              Explore Collaborations
            </a> -->
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

  // Static Career Opportunities content for the careers/portal landing sections.
  readonly careerOpportunities: string[] = [
    'Corporate Trainers & Subject Matter Experts',
    'Digital Marketing Professionals',
    'Graphic Designers & Creative Designers',
    'Video Editors & Motion Graphics Artists',
    'Content Writers & Copywriters',
    'Social Media Managers',
    'Photographers & Videographers',
    'Event Managers & Coordinators',
    'Film & Television Production Professionals',
    'Casting & Talent Management Executives',
    'HR & Recruitment Professionals',
    'Business Development Executives',
    'Project Coordinators',
    'Administrative & Operations Professionals',
    'Creative Consultants',
    'Actors, Models, Anchors & Performing Artists',
    'Freelancers and Project-Based Professionals',
  ];

  readonly whyJoinPoints: { icon: string; text: string }[] = [
    { icon: '🌐', text: 'Contribute to diverse and meaningful projects across multiple industries.' },
    { icon: '🤝', text: 'Collaborate with experienced professionals and creative teams.' },
    { icon: '🏛️', text: 'Work on assignments involving government organizations, public sector enterprises, corporate clients, educational institutions, and the media & entertainment industry.' },
    { icon: '🚀', text: 'Build your skills in a dynamic, collaborative, and innovation-driven environment.' },
    { icon: '📈', text: 'Grow through challenging assignments, continuous learning, and professional development.' },
  ];

  readonly submissionItems: string[] = [
    'Your updated Resume / Curriculum Vitae',
    'A recent photograph (where relevant)',
    'Portfolio or work samples (if applicable)',
    'Links to your website, showreel, or social media profiles (if applicable)',
    'A brief cover note outlining your areas of expertise and career interests',
  ];

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
