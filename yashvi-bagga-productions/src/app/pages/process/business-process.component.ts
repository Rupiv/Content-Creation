import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';

interface ProcessStep {
  title: string;
  description: string;
}

interface BusinessProcess {
  key: string;
  label: string;
  icon: string;
  tagline: string;
  /** Optional CTA link to the matching workflow. */
  ctaLabel?: string;
  ctaLink?: string;
  steps: ProcessStep[];
}

/**
 * MODULE 7 — Business Process Visualization.
 *
 * An interactive, tabbed view of the company's five core operating workflows:
 * Casting, Outsourcing, Social Media Growth, Technology Development and
 * Training. Switching tabs animates the corresponding step sequence.
 */
@Component({
  selector: 'app-business-process',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <section class="relative min-h-[52vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      </div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">How We Work</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">Our Business Processes</h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          A transparent look at how each part of YASHVI BAGGA PRODUCTIONS operates — from casting and outsourcing to growth, technology and training.
        </p>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.07),_transparent_30%)]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Process Explorer"
          title="Five Workflows, One Standard of Excellence"
          [titleGradient]="true"
          appScrollAnimation animationType="fade-up"
        />

        <!-- Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12" role="tablist">
          @for (process of processes; track process.key) {
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="active() === process.key"
              class="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-poppins transition-all duration-300"
              [class.border-brand-gold]="active() === process.key"
              [class.bg-brand-gold/10]="active() === process.key"
              [class.text-brand-gold]="active() === process.key"
              [class.border-white/10]="active() !== process.key"
              [class.text-brand-white/60]="active() !== process.key"
              (click)="select(process.key)"
            >
              <span>{{ process.icon }}</span> {{ process.label }}
            </button>
          }
        </div>

        <!-- Active process -->
        <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start">
          <div class="rounded-[34px] border border-brand-white/10 bg-brand-black/70 p-8 lg:sticky lg:top-28">
            <div class="inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-brand-gold/20 bg-brand-gold/10 text-3xl text-brand-gold mb-6">
              {{ current().icon }}
            </div>
            <h2 class="text-3xl font-playfair text-brand-white mb-4">{{ current().label }}</h2>
            <p class="text-brand-white/60 leading-7 mb-6">{{ current().tagline }}</p>
            <div class="rounded-2xl border border-brand-white/10 bg-brand-dark/60 p-4 mb-6">
              <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-1">Stages</p>
              <p class="text-brand-white text-2xl font-playfair">{{ current().steps.length }} steps</p>
            </div>
            @if (current().ctaLink) {
              <app-magnetic-button>
                <a [routerLink]="current().ctaLink" class="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white">
                  {{ current().ctaLabel }}
                </a>
              </app-magnetic-button>
            }
          </div>

          <!-- Animated step timeline; re-keyed on tab change so it re-animates -->
          <ol class="relative space-y-5" [attr.data-active]="active()">
            @for (step of current().steps; track step.title; let i = $index) {
              <li class="relative flex items-start gap-5 rounded-[26px] border border-brand-white/10 bg-brand-black/60 p-6 transition-all duration-500 hover:border-brand-gold/25 animate-slide-up"
                  [style.animation-delay]="(i * 0.08) + 's'">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold font-playfair">
                  {{ i + 1 }}
                </div>
                <div>
                  <h3 class="text-brand-white font-medium text-lg">{{ step.title }}</h3>
                  <p class="mt-1 text-brand-white/55 text-sm leading-6">{{ step.description }}</p>
                </div>
                @if (i < current().steps.length - 1) {
                  <span class="absolute left-[2.45rem] top-[4.6rem] h-5 w-px bg-brand-gold/20"></span>
                }
              </li>
            }
          </ol>
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.1),_transparent_30%)]"></div>
      <div class="relative max-w-5xl mx-auto rounded-[40px] border border-brand-gold/15 bg-brand-dark/90 p-12 text-center">
        <h2 class="heading-lg text-brand-white mb-6">Ready to begin your journey with us?</h2>
        <p class="body-lg text-brand-white/70 max-w-2xl mx-auto mb-10">Whichever process fits your goal, the next step is a quick conversation.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <app-magnetic-button>
            <a routerLink="/contact" class="inline-flex items-center gap-3 px-10 py-4 bg-brand-gold text-brand-black font-semibold rounded-full transition-all duration-500 hover:bg-brand-white">Contact Us</a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a routerLink="/join-network" class="inline-flex items-center gap-3 px-10 py-4 border border-brand-white/20 text-brand-white font-medium rounded-full transition-all duration-500 hover:border-brand-gold hover:text-brand-gold">Join the Network</a>
          </app-magnetic-button>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class BusinessProcessComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  readonly active = signal<string>('casting');

  readonly processes: BusinessProcess[] = [
    {
      key: 'casting',
      label: 'Casting Process',
      icon: '🎭',
      tagline: 'From brief to booking — how we match the right talent to every production.',
      ctaLabel: 'Apply for Casting',
      ctaLink: '/casting-application',
      steps: [
        { title: 'Casting Brief', description: 'We capture the role, mood, deliverables and timeline from the client.' },
        { title: 'Talent Sourcing', description: 'We search our network and open applications for the best-fit profiles.' },
        { title: 'Shortlisting', description: 'Profiles are evaluated and a curated shortlist is prepared.' },
        { title: 'Auditions', description: 'Selected talent is invited to auditions or callbacks.' },
        { title: 'Selection & Booking', description: 'Final approvals, contracts and call-sheet coordination.' },
        { title: 'Production Support', description: 'On-set coordination, feedback and follow-up management.' },
      ],
    },
    {
      key: 'outsourcing',
      label: 'Outsourcing Process',
      icon: '👔',
      tagline: 'A structured pipeline that turns a workforce requirement into deployed talent.',
      ctaLabel: 'Submit a Requirement',
      ctaLink: '/manpower-requirement',
      steps: [
        { title: 'Requirement Intake', description: 'Organisations submit roles, headcount and deployment details.' },
        { title: 'Needs Analysis', description: 'We refine the brief, skills and compensation expectations.' },
        { title: 'Sourcing & Screening', description: 'Candidates are sourced, screened and verified.' },
        { title: 'Client Interviews', description: 'Shortlisted candidates are presented for client interviews.' },
        { title: 'Onboarding', description: 'Selected workforce is onboarded and deployed.' },
        { title: 'Ongoing Management', description: 'Performance, replacements and compliance are managed.' },
      ],
    },
    {
      key: 'social',
      label: 'Social Media Growth',
      icon: '📱',
      tagline: 'A repeatable growth engine for creators and brands.',
      ctaLabel: 'Explore Collaborations',
      ctaLink: '/collaborations',
      steps: [
        { title: 'Audit & Goals', description: 'We assess the current presence and define measurable goals.' },
        { title: 'Content Strategy', description: 'A content pillar plan and posting cadence are designed.' },
        { title: 'Production', description: 'Reels, posts and campaign assets are produced.' },
        { title: 'Distribution', description: 'Content is published, boosted and cross-promoted.' },
        { title: 'Engagement', description: 'Community management and influencer collaborations drive reach.' },
        { title: 'Analytics & Optimisation', description: 'Performance is measured and the strategy is refined.' },
      ],
    },
    {
      key: 'technology',
      label: 'Technology Development',
      icon: '💻',
      tagline: 'How we plan, build and ship reliable digital products.',
      ctaLabel: 'View IT Solutions',
      ctaLink: '/it-solutions',
      steps: [
        { title: 'Discovery', description: 'We gather requirements and define scope and success metrics.' },
        { title: 'Design & Architecture', description: 'UX, UI and system architecture are designed.' },
        { title: 'Development', description: 'Features are built in iterative, reviewable sprints.' },
        { title: 'Testing & QA', description: 'Functionality, performance and security are verified.' },
        { title: 'Deployment', description: 'The product is launched with monitoring in place.' },
        { title: 'Support & Scale', description: 'Maintenance, enhancements and scaling follow.' },
      ],
    },
    {
      key: 'training',
      label: 'Training Process',
      icon: '🎓',
      tagline: 'Outcome-driven vocational training for creators and professionals.',
      ctaLabel: 'View Training',
      ctaLink: '/vocational-training',
      steps: [
        { title: 'Skill Assessment', description: 'We evaluate current skills and learning goals.' },
        { title: 'Curriculum Design', description: 'A tailored curriculum and schedule are prepared.' },
        { title: 'Hands-on Training', description: 'Practical, project-based sessions are delivered.' },
        { title: 'Mentorship', description: 'Learners receive feedback and one-on-one guidance.' },
        { title: 'Assessment & Certification', description: 'Progress is assessed and certificates are awarded.' },
        { title: 'Placement Support', description: 'We connect graduates to network opportunities.' },
      ],
    },
  ];

  readonly current = computed<BusinessProcess>(
    () => this.processes.find((p) => p.key === this.active()) ?? this.processes[0],
  );

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Our Process | YASHVI BAGGA PRODUCTIONS',
      description: 'Explore how YASHVI BAGGA PRODUCTIONS operates across casting, outsourcing, social media growth, technology development and training.',
      url: 'https://yashvibagga.com/our-process',
    });
  }

  select(key: string): void {
    this.active.set(key);
  }
}
