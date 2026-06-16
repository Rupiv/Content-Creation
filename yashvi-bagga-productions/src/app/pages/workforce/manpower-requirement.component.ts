import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';
import { RequirementTextareaComponent } from '../../shared/components/requirement-textarea/requirement-textarea.component';
import { EmailOtpComponent } from '../../shared/components/email-otp/email-otp.component';
import { MobileOtpComponent } from '../../shared/components/mobile-otp/mobile-otp.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { SkillTagsComponent } from '../../shared/components/skill-tags/skill-tags.component';
import { ToastService } from '../../shared/services/toast.service';
import { ApplicationService } from '../../shared/services/application.service';
import { indianMobileValidator } from '../../shared/validators/form.validators';
import { COMPENSATION_RANGES, EXPERIENCE_LEVELS, INDUSTRIES, labelOf } from '../../shared/models/taxonomy.model';
import { OutsourcingRequirement, WorkforceRole } from '../../shared/models/outsourcing-requirement.model';
import { DocumentUpload } from '../../shared/models/document-upload.model';

interface WizardStep {
  index: number;
  title: string;
  subtitle: string;
}

/**
 * MODULE 4 — Manpower Requirement Portal.
 *
 * A six-step requirement wizard for organisations sourcing workforce:
 *   1 Organization Information · 2 Workforce Requirements · 3 Deployment Details
 *   4 Compensation · 5 Verification · 6 Submission (review).
 *
 * Per-step validation gates navigation; the final review submits an
 * OutsourcingRequirement through the shared ApplicationService.
 */
@Component({
  selector: 'app-manpower-requirement',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, CaptchaComponent,
    RequirementTextareaComponent, EmailOtpComponent, MobileOtpComponent,
    FileUploadComponent, SkillTagsComponent,
  ],
  template: `
    <section class="relative min-h-[52vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      </div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Manpower Outsourcing</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">Submit a Workforce Requirement</h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Tell us what your organisation needs and our team will assemble the right talent. Complete the guided steps below.
        </p>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_28%)]"></div>
      <div class="relative max-w-4xl mx-auto">
        <!-- Step indicator -->
        <ol class="mb-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          @for (s of steps; track s.index) {
            <li class="flex flex-col items-center text-center">
              <div class="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition-colors"
                [class.border-brand-gold]="step() >= s.index"
                [class.text-brand-gold]="step() >= s.index"
                [class.bg-brand-gold/10]="step() === s.index"
                [class.border-white/15]="step() < s.index"
                [class.text-brand-white/40]="step() < s.index"
              >
                @if (step() > s.index) { ✓ } @else { {{ s.index + 1 }} }
              </div>
              <span class="mt-2 text-[10px] uppercase tracking-[0.15em]"
                [class.text-brand-white/70]="step() >= s.index"
                [class.text-brand-white/35]="step() < s.index"
              >{{ s.title }}</span>
            </li>
          }
        </ol>

        <div class="glass-card p-8 md:p-12">
          <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-1">Step {{ step() + 1 }} of 6</p>
          <h2 class="text-2xl font-playfair text-brand-white mb-8">{{ steps[step()].subtitle }}</h2>

          <form [formGroup]="form">
            <!-- STEP 1 — Organization Information -->
            @if (step() === 0) {
              <div formGroupName="organization" class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Organization Name *</label>
                  <input formControlName="organizationName" type="text" class="form-input" placeholder="Company / brand name" />
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Industry *</label>
                  <select formControlName="industry" class="form-input">
                    <option value="" disabled>Select industry</option>
                    @for (ind of industries; track ind.slug) {
                      <option [value]="ind.slug">{{ ind.label }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Contact Person *</label>
                  <input formControlName="contactPerson" type="text" class="form-input" placeholder="Full name" />
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Company Size</label>
                  <select formControlName="companySize" class="form-input">
                    <option value="">Select size</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-500">201–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
                  <input formControlName="email" type="email" class="form-input" placeholder="work@company.com" />
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Mobile Number *</label>
                  <input formControlName="mobile" type="tel" class="form-input" placeholder="+91 98765 43210" />
                  @if (orgGroup.get('mobile')?.touched && orgGroup.get('mobile')?.hasError('indianMobile')) {
                    <p class="mt-1.5 text-brand-pink font-poppins text-xs">Enter a valid 10-digit Indian mobile number.</p>
                  }
                </div>
                <div class="md:col-span-2">
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Website</label>
                  <input formControlName="website" type="text" class="form-input" placeholder="https://" />
                </div>
              </div>
            }

            <!-- STEP 2 — Workforce Requirements -->
            @if (step() === 1) {
              <div formArrayName="roles" class="space-y-6">
                @for (role of roles.controls; track $index; let i = $index) {
                  <div [formGroupName]="i" class="rounded-2xl border border-brand-white/10 bg-brand-black/50 p-5">
                    <div class="flex items-center justify-between mb-4">
                      <p class="text-brand-white/70 font-poppins text-sm">Role #{{ i + 1 }}</p>
                      @if (roles.length > 1) {
                        <button type="button" class="text-brand-white/50 hover:text-brand-pink text-sm" (click)="removeRole(i)">Remove</button>
                      }
                    </div>
                    <div class="grid gap-4 md:grid-cols-3">
                      <div class="md:col-span-2">
                        <label class="block text-brand-white/60 font-poppins text-xs mb-2">Role Title *</label>
                        <input formControlName="title" type="text" class="form-input" placeholder="e.g. Video Editor" />
                      </div>
                      <div>
                        <label class="block text-brand-white/60 font-poppins text-xs mb-2">Headcount *</label>
                        <input formControlName="count" type="number" min="1" class="form-input" placeholder="1" />
                      </div>
                      <div>
                        <label class="block text-brand-white/60 font-poppins text-xs mb-2">Experience</label>
                        <select formControlName="experienceLevel" class="form-input">
                          <option value="">Any</option>
                          @for (level of experienceLevels; track level.slug) {
                            <option [value]="level.slug">{{ level.label }}</option>
                          }
                        </select>
                      </div>
                      <div class="md:col-span-3">
                        <app-skill-tags formControlName="skills" label="Required Skills" placeholder="Add a skill…" />
                      </div>
                    </div>
                  </div>
                }
                <button type="button" class="rounded-full border border-brand-gold/30 px-5 py-2 text-sm text-brand-gold transition-colors hover:bg-brand-gold/10" (click)="addRole()">
                  + Add Another Role
                </button>
                <p class="text-brand-white/50 text-sm">Total headcount: <span class="text-brand-gold">{{ totalHeadcount() }}</span></p>
              </div>
            }

            <!-- STEP 3 — Deployment Details -->
            @if (step() === 2) {
              <div formGroupName="deployment" class="grid gap-6 md:grid-cols-2">
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Deployment Location</label>
                  <input formControlName="location" type="text" class="form-input" placeholder="e.g. Mumbai / Pan-India" />
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Work Mode</label>
                  <select formControlName="workMode" class="form-input">
                    <option value="">Select mode</option>
                    <option value="onsite">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Required Start Date</label>
                  <input formControlName="startDate" type="date" class="form-input" />
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Engagement Duration</label>
                  <input formControlName="duration" type="text" class="form-input" placeholder="e.g. 3 months / Permanent" />
                </div>
              </div>
            }

            <!-- STEP 4 — Compensation -->
            @if (step() === 3) {
              <div formGroupName="compensation" class="space-y-6">
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Budget Range *</label>
                  <select formControlName="budgetRange" class="form-input">
                    <option value="" disabled>Select budget</option>
                    @for (range of compensationRanges; track range.slug) {
                      <option [value]="range.slug">{{ range.label }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-brand-white/60 font-poppins text-sm mb-2">Compensation Notes</label>
                  <textarea formControlName="compensationNotes" rows="3" class="form-input resize-none"
                    placeholder="Benefits, incentives, per-role budgets…"></textarea>
                </div>
              </div>
            }

            <!-- STEP 5 — Verification -->
            @if (step() === 4) {
              <div class="space-y-6">
                <p class="text-brand-white/60 text-sm">Verify the contact details so we can confirm and follow up on your requirement.</p>
                <app-email-otp formControlName="emailVerified"
                  [destination]="orgGroup.get('email')?.value || ''"
                  [destinationValid]="!!orgGroup.get('email')?.valid" purpose="manpower-requirement" />
                <app-mobile-otp formControlName="mobileVerified"
                  [destination]="orgGroup.get('mobile')?.value || ''"
                  [destinationValid]="!!orgGroup.get('mobile')?.valid" purpose="manpower-requirement" />
                <app-captcha #captchaRef formControlName="captcha" action="manpower_requirement" />
              </div>
            }

            <!-- STEP 6 — Submission -->
            @if (step() === 5) {
              <div class="space-y-6">
                <app-requirement-textarea formControlName="requirement" label="Describe Your Requirement"
                  placeholder="Summarise the overall requirement, timelines and any special needs…" />
                <app-file-upload formControlName="attachments" label="Supporting Documents (optional)"
                  [multiple]="true" [accept]="['pdf','docx','zip','jpg','png']" [maxSizeMb]="15" purpose="manpower-attachments" />

                <div class="rounded-2xl border border-brand-white/10 bg-brand-black/50 p-6 space-y-2 text-sm">
                  <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-3">Review</p>
                  <p class="text-brand-white/70"><span class="text-brand-white/40">Organization:</span> {{ orgGroup.get('organizationName')?.value || '—' }} ({{ industryLabel() }})</p>
                  <p class="text-brand-white/70"><span class="text-brand-white/40">Contact:</span> {{ orgGroup.get('contactPerson')?.value || '—' }} · {{ orgGroup.get('email')?.value }} · {{ orgGroup.get('mobile')?.value }}</p>
                  <p class="text-brand-white/70"><span class="text-brand-white/40">Roles:</span> {{ roles.length }} · Total headcount {{ totalHeadcount() }}</p>
                  <p class="text-brand-white/70"><span class="text-brand-white/40">Budget:</span> {{ budgetLabel() }}</p>
                </div>

                @if (submitted()) {
                  <div class="rounded-[24px] border border-brand-gold/15 bg-brand-gold/10 p-5 text-brand-white/80 text-sm">
                    Thank you — your requirement has been <span class="text-brand-gold">Submitted</span>. Our team will contact you shortly.
                  </div>
                }
              </div>
            }
          </form>

          <!-- Navigation -->
          <div class="mt-10 flex items-center justify-between gap-4">
            <button type="button" (click)="prev()" [disabled]="step() === 0"
              class="rounded-full border border-brand-white/15 px-6 py-3 font-medium text-brand-white transition-colors hover:border-brand-gold hover:text-brand-gold disabled:opacity-40 disabled:cursor-not-allowed">
              Back
            </button>

            @if (step() < 5) {
              <button type="button" (click)="next()"
                class="rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black transition-colors hover:bg-brand-white">
                Continue
              </button>
            } @else {
              <button type="button" (click)="submit()" [disabled]="submitting()"
                class="inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3 font-medium text-brand-black transition-colors hover:bg-brand-white disabled:opacity-50 disabled:cursor-not-allowed">
                @if (submitting()) {
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                  Submitting…
                } @else { Submit Requirement }
              </button>
            }
          </div>
        </div>

        <p class="mt-6 text-center text-brand-white/40 text-sm">
          Prefer to talk first? <a routerLink="/contact" class="text-brand-gold hover:underline">Contact our team</a>.
        </p>
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
export class ManpowerRequirementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seoService = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly applications = inject(ApplicationService);

  @ViewChild('captchaRef') private captcha?: CaptchaComponent;

  readonly industries = INDUSTRIES;
  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly compensationRanges = COMPENSATION_RANGES;

  readonly steps: WizardStep[] = [
    { index: 0, title: 'Org', subtitle: 'Organization Information' },
    { index: 1, title: 'Workforce', subtitle: 'Workforce Requirements' },
    { index: 2, title: 'Deploy', subtitle: 'Deployment Details' },
    { index: 3, title: 'Budget', subtitle: 'Compensation' },
    { index: 4, title: 'Verify', subtitle: 'Verification' },
    { index: 5, title: 'Submit', subtitle: 'Review & Submission' },
  ];

  step = signal(0);
  submitted = signal(false);
  submitting = signal(false);

  form = this.fb.group({
    organization: this.fb.group({
      organizationName: ['', Validators.required],
      industry: ['', Validators.required],
      contactPerson: ['', Validators.required],
      companySize: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, indianMobileValidator()]],
      website: [''],
    }),
    roles: this.fb.array([this.buildRole()]),
    deployment: this.fb.group({
      location: [''],
      workMode: [''],
      startDate: [''],
      duration: [''],
    }),
    compensation: this.fb.group({
      budgetRange: ['', Validators.required],
      compensationNotes: [''],
    }),
    emailVerified: [null, Validators.required],
    mobileVerified: [null, Validators.required],
    captcha: [''],
    requirement: ['', Validators.required],
    attachments: [null as DocumentUpload[] | null],
  });

  get orgGroup(): FormGroup {
    return this.form.get('organization') as FormGroup;
  }
  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  readonly totalHeadcount = signal(0);

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Manpower Requirement | YASHVI BAGGA PRODUCTIONS',
      description: 'Submit a workforce / manpower outsourcing requirement through our guided multi-step portal.',
      url: 'https://yashvibagga.com/manpower-requirement',
    });
    this.recountHeadcount();
    this.roles.valueChanges.subscribe(() => this.recountHeadcount());
  }

  private buildRole(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      experienceLevel: [''],
      skills: [[] as string[]],
    });
  }

  addRole(): void {
    this.roles.push(this.buildRole());
  }

  removeRole(i: number): void {
    this.roles.removeAt(i);
    this.recountHeadcount();
  }

  private recountHeadcount(): void {
    const total = this.roles.controls.reduce((sum, c) => sum + (Number(c.get('count')?.value) || 0), 0);
    this.totalHeadcount.set(total);
  }

  industryLabel(): string {
    return labelOf(INDUSTRIES, this.orgGroup?.get('industry')?.value);
  }
  budgetLabel(): string {
    return labelOf(COMPENSATION_RANGES, this.form.get('compensation.budgetRange')?.value);
  }

  // --- step navigation ------------------------------------------------------
  next(): void {
    if (!this.validateStep(this.step())) {
      this.toast.error('Please complete the required fields on this step.');
      return;
    }
    this.step.set(Math.min(5, this.step() + 1));
    this.scrollUp();
  }

  prev(): void {
    this.step.set(Math.max(0, this.step() - 1));
    this.scrollUp();
  }

  private validateStep(index: number): boolean {
    const targets: Array<{ ctrl: 'organization' | 'roles' | 'deployment' | 'compensation' } | { fields: string[] }> = [
      { ctrl: 'organization' },
      { ctrl: 'roles' },
      { ctrl: 'deployment' },
      { ctrl: 'compensation' },
      { fields: ['emailVerified', 'mobileVerified'] },
      { fields: ['requirement'] },
    ];
    const target = targets[index];
    if ('ctrl' in target) {
      const group = this.form.get(target.ctrl);
      group?.markAllAsTouched();
      return !!group?.valid;
    }
    let ok = true;
    for (const f of target.fields) {
      const c = this.form.get(f);
      c?.markAsTouched();
      ok = ok && !!c?.valid;
    }
    return ok;
  }

  private scrollUp(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async submit(): Promise<void> {
    if (!this.validateStep(5) || this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Please complete all required fields before submitting.');
      return;
    }
    if ((await this.captcha?.execute()) === false) {
      return;
    }

    this.submitting.set(true);
    const loadingId = this.toast.loading('Submitting your requirement…');

    const org = this.orgGroup.getRawValue();
    const dep = (this.form.get('deployment') as FormGroup).getRawValue();
    const comp = (this.form.get('compensation') as FormGroup).getRawValue();

    const requirement: OutsourcingRequirement = {
      organizationName: org.organizationName,
      industry: org.industry,
      contactPerson: org.contactPerson,
      email: org.email,
      mobile: org.mobile,
      website: org.website || undefined,
      companySize: org.companySize || undefined,
      roles: this.roles.getRawValue() as WorkforceRole[],
      totalHeadcount: this.totalHeadcount(),
      location: dep.location || undefined,
      workMode: dep.workMode || undefined,
      startDate: dep.startDate || undefined,
      duration: dep.duration || undefined,
      budgetRange: comp.budgetRange,
      compensationNotes: comp.compensationNotes || undefined,
      requirement: (this.form.get('requirement')?.value as string) ?? undefined,
      attachments: (this.form.get('attachments')?.value as DocumentUpload[] | null) ?? [],
    };

    this.applications.submitOutsourcingRequirement(requirement).subscribe({
      next: () => {
        this.toast.update(loadingId, 'success', 'Thank you! Your requirement has been received.');
        this.submitted.set(true);
        this.submitting.set(false);
      },
      error: () => {
        this.toast.update(loadingId, 'error', 'Something went wrong. Please try again shortly.');
        this.submitting.set(false);
      },
    });
  }
}
