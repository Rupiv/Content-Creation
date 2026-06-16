import { AfterViewInit, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../../shared/components/magnetic-button/magnetic-button.component';

interface FoundationTimelineItem {
  title: string;
  description: string;
  year: string;
}

interface FoundationPillar {
  title: string;
  description: string;
}

interface EcosystemDivision {
  title: string;
  description: string;
  link: string;
  icon: string;
  tags: string[];
}

interface TalentCategory {
  name: string;
  icon: string;
}

interface FeaturedTalent {
  initials: string;
  name: string;
  role: string;
  specialty: string;
  badge: string;
}

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

interface MetricCard {
  value: string;
  label: string;
}

interface WorkflowStep {
  title: string;
  description: string;
}

interface IndustryItem {
  name: string;
  icon: string;
}

interface RegistrationRole {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

interface TrainingProgram {
  title: string;
  description: string;
  icon: string;
}

interface TrainingStory {
  initials: string;
  name: string;
  outcome: string;
  quote: string;
}

@Component({
  selector: 'app-ecosystem-expansion',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <!-- FOUNDATION NOTE -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.08),_transparent_32%)]"></div>
      <div class="absolute -left-16 top-12 h-72 w-72 rounded-full bg-brand-gold/10 blur-[110px] foundation-orb"></div>
      <div class="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-pink/10 blur-[130px] foundation-orb"></div>

      <div class="relative max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.96fr_1.04fr] items-center">
        <div class="space-y-8">
          <div class="space-y-4">
            <span class="text-brand-gold text-sm uppercase tracking-[0.35em]">Foundation Note</span>
            <h2 class="heading-lg text-brand-white max-w-2xl">The origin story behind a luxury creative ecosystem.</h2>
            <p class="body-lg text-brand-white/65 max-w-2xl">
              YASHVI BAGGA PRODUCTIONS began as a personal creative vision and evolved into a full-service house built for media, technology, talent and growth.
            </p>
          </div>

          <div class="rounded-[32px] border border-brand-gold/15 bg-brand-dark/80 p-8 backdrop-blur-sm">
            <p class="text-brand-white/85 font-playfair text-2xl md:text-3xl leading-relaxed">
              “We build brands like cinematic stories — with intention, precision, and a signature gold finish.”
            </p>
            <div class="mt-6 flex items-center gap-4">
              <div class="h-12 w-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold font-playfair">
                YB
              </div>
              <div>
                <p class="text-brand-white font-medium">Yashvi Bagga</p>
                <p class="text-brand-white/45 text-sm">Founder & Creative Director</p>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            @for (item of foundationTimeline; track item.title) {
              <div class="foundation-timeline-item relative overflow-hidden rounded-[28px] border border-brand-white/10 bg-brand-dark/70 p-6 transition-all duration-500 hover:border-brand-gold/25">
                <div class="absolute right-4 top-4 h-12 w-12 rounded-full bg-brand-gold/10 blur-xl"></div>
                <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-3">{{ item.year }}</p>
                <h3 class="text-xl font-playfair text-brand-white mb-3">{{ item.title }}</h3>
                <p class="text-brand-white/60 text-sm leading-6">{{ item.description }}</p>
              </div>
            }
          </div>
        </div>

        <div class="relative">
          <div class="relative overflow-hidden rounded-[40px] border border-brand-gold/15 bg-brand-dark/90 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,45,136,0.12),_transparent_35%)]"></div>
            <div class="aspect-[4/5] bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center cinematic-overlay"></div>
            <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-black/85 to-transparent"></div>
            <div class="absolute top-6 right-6 rounded-full border border-brand-gold/20 bg-brand-black/55 px-4 py-2 text-brand-gold text-xs tracking-[0.35em] uppercase backdrop-blur-sm">
              Signature
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="rounded-[30px] border border-brand-white/10 bg-brand-black/70 p-6 backdrop-blur-lg">
                <div class="grid gap-4 sm:grid-cols-2">
                  @for (pillar of foundationPillars; track pillar.title) {
                    <div class="space-y-2">
                      <p class="text-brand-gold uppercase text-[11px] tracking-[0.3em]">{{ pillar.title }}</p>
                      <p class="text-brand-white/65 text-sm leading-6">{{ pillar.description }}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-8 left-10 rounded-full border border-brand-gold/20 bg-brand-black/70 px-6 py-3 text-brand-white/75 text-xs uppercase tracking-[0.35em] backdrop-blur-sm">
            Editorial Storytelling • Cinematic Identity • Purpose-Led Growth
          </div>
        </div>
      </div>
    </section>

    <!-- ECOSYSTEM -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.07),_transparent_28%)]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Ecosystem"
          title="One House, Four Connected Divisions"
          description="A premium business ecosystem that unifies creative production, talent, technology and workforce delivery."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (division of ecosystemDivisions; track division.title) {
            <a
              [routerLink]="division.link"
              class="ecosystem-card group relative overflow-hidden rounded-[30px] border border-brand-white/10 bg-brand-black/70 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25"
              appScrollAnimation
              animationType="fade-up"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-brand-gold/0 via-transparent to-brand-pink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div class="relative z-10 space-y-5">
                <div class="inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-brand-gold/20 bg-brand-gold/10 text-2xl text-brand-gold">
                  {{ division.icon }}
                </div>
                <div class="space-y-3">
                  <h3 class="text-2xl font-playfair text-brand-white">{{ division.title }}</h3>
                  <p class="text-brand-white/60 text-sm leading-6">{{ division.description }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  @for (tag of division.tags; track tag) {
                    <span class="rounded-full border border-brand-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-brand-white/45">{{ tag }}</span>
                  }
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- TALENT NETWORK -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute right-0 top-24 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Casting & Talent"
          title="Talent Network & Casting Services"
          description="Curated talent discovery for actors, models, creators and production-ready collaborators."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] items-start">
          <div class="space-y-8">
            <div class="grid grid-cols-2 gap-4">
              @for (category of talentCategories; track category.name) {
                <div class="group rounded-[26px] border border-brand-gold/15 bg-brand-dark/75 p-5 text-center transition-all duration-500 hover:border-brand-gold/35 hover:bg-brand-black/80">
                  <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/15 bg-brand-gold/10 text-xl text-brand-gold">
                    {{ category.icon }}
                  </div>
                  <p class="text-brand-white/75 text-sm">{{ category.name }}</p>
                </div>
              }
            </div>

            <div class="rounded-[32px] border border-brand-white/10 bg-brand-dark/80 p-8">
              <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-4">Collaboration CTA</p>
              <h3 class="text-2xl font-playfair text-brand-white mb-4">Cast with confidence. Collaborate with clarity.</h3>
              <p class="text-brand-white/60 text-sm leading-6 mb-6">
                We connect brands with verified talent and content partners ready for campaigns, shoots, live appearances and digital storytelling.
              </p>
              <div class="flex flex-col sm:flex-row gap-3">
                <app-magnetic-button>
                  <a routerLink="/join-network" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-gold text-brand-black font-medium transition-colors duration-300 hover:bg-brand-white">
                    Register as Talent
                  </a>
                </app-magnetic-button>
                <app-magnetic-button>
                  <a routerLink="/collaborations" class="inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-white/15 text-brand-white font-medium transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
                    Apply for Collaborations
                  </a>
                </app-magnetic-button>
              </div>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            @for (profile of featuredTalent; track profile.name) {
              <div class="network-profile-card rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/25">
                <div class="flex items-center gap-4">
                  <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-[radial-gradient(circle,_rgba(212,175,55,0.22),_rgba(17,17,17,0.95))] text-2xl font-playfair text-brand-white">
                    {{ profile.initials }}
                  </div>
                  <div>
                    <p class="text-brand-white font-medium">{{ profile.name }}</p>
                    <p class="text-brand-gold text-xs uppercase tracking-[0.28em] mt-1">{{ profile.role }}</p>
                  </div>
                </div>
                <p class="mt-5 text-brand-white/60 text-sm leading-6">{{ profile.specialty }}</p>
                <div class="mt-5 inline-flex rounded-full border border-brand-gold/15 bg-brand-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-brand-gold">
                  {{ profile.badge }}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- TECHNOLOGY & DIGITAL SOLUTIONS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,212,255,0.12),_transparent_30%)]"></div>
      <div class="relative max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1fr_0.94fr] items-start">
        <div class="space-y-8">
          <app-section-header
            subtitle="Technology Division"
            title="Technology & Digital Solutions"
            description="Modern digital systems that power websites, apps, business workflows and scalable infrastructure."
            [titleGradient]="true"
            [containerClass]="'text-left mb-0'"
            appScrollAnimation
            animationType="fade-up"
          />

          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            @for (service of itServices; track service.title) {
              <div class="glass-card border border-brand-white/10 p-5 transition-all duration-500 hover:border-brand-gold/25">
                <div class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-white/10 bg-brand-black/70 text-lg text-brand-gold">
                  {{ service.icon }}
                </div>
                <h3 class="text-brand-white font-medium mb-2">{{ service.title }}</h3>
                <p class="text-brand-white/55 text-sm leading-6">{{ service.description }}</p>
              </div>
            }
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <app-magnetic-button>
              <a routerLink="/it-solutions" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-gold text-brand-black font-medium transition-colors duration-300 hover:bg-brand-white">
                Explore IT Solutions
              </a>
            </app-magnetic-button>
            <app-magnetic-button>
              <a routerLink="/contact" class="inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-white/15 text-brand-white font-medium transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
                Request a Demo
              </a>
            </app-magnetic-button>
          </div>
        </div>

        <div class="space-y-6">
          <div class="rounded-[34px] border border-brand-white/10 bg-brand-black/80 p-8">
            <div class="grid grid-cols-2 gap-4">
              @for (metric of itMetrics; track metric.label) {
                <div class="rounded-[24px] border border-brand-white/10 bg-brand-dark/70 p-5 text-center">
                  <p class="text-3xl font-playfair text-brand-gold">{{ metric.value }}</p>
                  <p class="mt-2 text-[11px] uppercase tracking-[0.28em] text-brand-white/50">{{ metric.label }}</p>
                </div>
              }
            </div>
          </div>

          <div class="rounded-[34px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-5">Workflow Diagram</p>
            <div class="space-y-4">
              @for (step of itWorkflow; track step.title; let i = $index) {
                <div class="flex items-start gap-4">
                  <div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold text-sm">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h3 class="text-brand-white font-medium">{{ step.title }}</h3>
                    <p class="text-brand-white/55 text-sm leading-6">{{ step.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WORKFORCE & OUTSOURCING -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Corporate Division"
          title="Workforce & Outsourcing Solutions"
          description="Enterprise staffing, project deployment and workforce support for growing organizations."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (service of workforceServices; track service.title) {
            <div class="group rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/35">
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-lg">
                {{ service.icon }}
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ service.title }}</h3>
              <p class="text-brand-white/58 text-sm leading-6">{{ service.description }}</p>
            </div>
          }
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div class="rounded-[32px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-emerald-300 text-xs uppercase tracking-[0.3em] mb-4">Industries Served</p>
            <div class="flex flex-wrap gap-3">
              @for (industry of industries; track industry.name) {
                <span class="rounded-full border border-brand-white/10 px-4 py-2 text-sm text-brand-white/65">{{ industry.name }}</span>
              }
            </div>
          </div>

          <div class="rounded-[32px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-emerald-300 text-xs uppercase tracking-[0.3em] mb-4">Process Timeline</p>
            <div class="space-y-5">
              @for (step of workforceWorkflow; track step.title; let i = $index) {
                <div class="flex items-start gap-4">
                  <div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-sm">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h3 class="text-brand-white font-medium">{{ step.title }}</h3>
                    <p class="text-brand-white/55 text-sm leading-6">{{ step.description }}</p>
                  </div>
                </div>
              }
            </div>
            <div class="mt-8">
              <a routerLink="/workforce-solutions" class="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-6 py-3 font-medium text-brand-black transition-all duration-300 hover:bg-brand-white">
                Explore Workforce Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CAREER PORTAL -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,45,136,0.09),_transparent_28%)]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Career Portal"
          title="Join Our Creative & Professional Network"
          description="Open registration pathways for talent, creators and media professionals."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (role of registrationRoles; track role.slug) {
            <button
              type="button"
              class="career-card rounded-[30px] border border-brand-white/10 bg-brand-black/75 p-6 text-left transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25"
              appScrollAnimation
              animationType="fade-up"
              (click)="openRegistration(role)"
            >
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl text-brand-gold">
                {{ role.icon }}
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ role.title }}</h3>
              <p class="text-brand-white/60 text-sm leading-6">{{ role.description }}</p>
              <div class="mt-5 text-[11px] uppercase tracking-[0.3em] text-brand-gold">Open Modal</div>
            </button>
          }
        </div>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-magnetic-button>
            <a routerLink="/join-network" class="inline-flex items-center justify-center rounded-full bg-brand-gold px-7 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white">
              Open Registration Page
            </a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a routerLink="/collaborations" class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-7 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
              Collaboration Brief
            </a>
          </app-magnetic-button>
        </div>

        @if (selectedRegistration()) {
          <div class="fixed inset-0 z-[60] flex items-center justify-center bg-brand-black/80 px-4 py-10 backdrop-blur-lg">
            <div class="relative w-full max-w-2xl rounded-[36px] border border-brand-gold/15 bg-brand-dark/95 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
              <button
                type="button"
                class="absolute right-5 top-5 h-10 w-10 rounded-full border border-brand-white/10 text-brand-white/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                (click)="closeRegistration()"
                aria-label="Close registration preview"
              >
                ×
              </button>

              <p class="text-brand-gold text-xs uppercase tracking-[0.35em] mb-4">Registration Preview</p>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">{{ selectedRegistration()?.title }}</h3>
              <p class="text-brand-white/65 leading-7 mb-6">
                {{ selectedRegistration()?.description }}
              </p>

              <div class="grid gap-3 sm:grid-cols-2 mb-8">
                <div class="rounded-[24px] border border-brand-white/10 bg-brand-black/70 p-4">
                  <p class="text-brand-white font-medium mb-2">Future API ready</p>
                  <p class="text-brand-white/55 text-sm leading-6">This modal is prepared for a future registration API, form submission and CRM handoff.</p>
                </div>
                <div class="rounded-[24px] border border-brand-white/10 bg-brand-black/70 p-4">
                  <p class="text-brand-white font-medium mb-2">Next step</p>
                  <p class="text-brand-white/55 text-sm leading-6">Continue to the registration page and complete your profile when the form is ready.</p>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <a
                  [routerLink]="['/join-network']"
                  [queryParams]="{ role: selectedRegistration()?.slug }"
                  class="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white"
                >
                  Go to Registration Page
                </a>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-6 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
                  (click)="closeRegistration()"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- VOCATIONAL TRAINING -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Vocational Training"
          title="Build Skills. Earn Certifications. Create Momentum."
          description="Practical training across digital, creative and professional development tracks."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (program of trainingPrograms; track program.title) {
            <div class="rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25">
              <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-xl text-brand-gold">
                {{ program.icon }}
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ program.title }}</h3>
              <p class="text-brand-white/60 text-sm leading-6">{{ program.description }}</p>
            </div>
          }
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div class="rounded-[34px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-4">Certification Journey</p>
            <div class="space-y-5">
              @for (step of trainingJourney; track step.title; let i = $index) {
                <div class="flex items-start gap-4">
                  <div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold text-sm">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <h3 class="text-brand-white font-medium">{{ step.title }}</h3>
                    <p class="text-brand-white/55 text-sm leading-6">{{ step.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="rounded-[34px] border border-brand-white/10 bg-brand-dark/80 p-8">
            <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-4">Success Stories</p>
            <div class="grid gap-4 md:grid-cols-2">
              @for (story of trainingStories; track story.name) {
                <div class="rounded-[28px] border border-brand-white/10 bg-brand-black/65 p-5">
                  <div class="flex items-center gap-4">
                    <div class="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-white font-medium">
                      {{ story.initials }}
                    </div>
                    <div>
                      <p class="text-brand-white font-medium">{{ story.name }}</p>
                      <p class="text-brand-gold text-xs uppercase tracking-[0.25em]">{{ story.outcome }}</p>
                    </div>
                  </div>
                  <p class="mt-4 text-brand-white/60 text-sm leading-6">“{{ story.quote }}”</p>
                </div>
              }
            </div>
            <div class="mt-8">
              <a routerLink="/vocational-training" class="inline-flex items-center gap-3 rounded-full bg-brand-gold px-6 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white">
                Explore Vocational Training
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class EcosystemExpansionComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  selectedRegistration = signal<RegistrationRole | null>(null);

  foundationTimeline: FoundationTimelineItem[] = [
    { year: 'Origin', title: 'A Single Creative Vision', description: 'Built to tell stronger stories and give brands a premium cinematic voice.' },
    { year: 'Growth', title: 'From Content to Company', description: 'Expanded from creator-led storytelling into production, talent and digital systems.' },
    { year: 'Today', title: 'A Multi-Vertical House', description: 'A connected ecosystem serving media, technology, staffing and professional training.' },
    { year: 'Future', title: 'Scale With Purpose', description: 'Designed for sustainable expansion, deeper partnerships and long-term brand impact.' },
  ];

  foundationPillars: FoundationPillar[] = [
    { title: 'Vision', description: 'To become a premium ecosystem for media, talent and digital transformation.' },
    { title: 'Mission', description: 'To deliver cinematic creative outcomes and operational excellence across every vertical.' },
    { title: 'Purpose', description: 'To connect people, brands and opportunities through elegant execution.' },
    { title: 'Core Values', description: 'Craft, trust, agility, collaboration and uncompromising visual standards.' },
  ];

  ecosystemDivisions: EcosystemDivision[] = [
    {
      title: 'Creative Media & Production',
      description: 'Luxury campaigns, content direction and cinematic production for brands and creators.',
      link: '/services/creative-media',
      icon: '🎬',
      tags: ['Content', 'Campaigns', 'Direction'],
    },
    {
      title: 'Casting & Talent Network',
      description: 'Curated access to actors, models, creators and performance-ready collaborators.',
      link: '/casting-services',
      icon: '🎭',
      tags: ['Casting', 'Talent', 'Collaboration'],
    },
    {
      title: 'IT Solutions & Technology',
      description: 'Modern web, app and digital infrastructure built for scale, speed and reliability.',
      link: '/it-solutions',
      icon: '💻',
      tags: ['Web', 'Apps', 'Cloud'],
    },
    {
      title: 'Workforce & Outsourcing Solutions',
      description: 'Strategic staffing, project teams and enterprise workforce support.',
      link: '/workforce-solutions',
      icon: '👥',
      tags: ['Staffing', 'Projects', 'Support'],
    },
  ];

  talentCategories: TalentCategory[] = [
    { name: 'Actors', icon: '🎭' },
    { name: 'Models', icon: '📸' },
    { name: 'Influencers', icon: '✨' },
    { name: 'Photographers', icon: '📷' },
    { name: 'Videographers', icon: '🎥' },
    { name: 'Content Creators', icon: '🪄' },
    { name: 'Voice Artists', icon: '🎙️' },
    { name: 'Anchors', icon: '🎤' },
    { name: 'Dancers', icon: '💃' },
    { name: 'Musicians', icon: '🎶' },
  ];

  featuredTalent: FeaturedTalent[] = [
    { initials: 'AS', name: 'Aarav Singh', role: 'Actor', specialty: 'Commercial presence with editorial versatility.', badge: 'Featured Profile' },
    { initials: 'MR', name: 'Mira Rao', role: 'Model', specialty: 'Luxury fashion and lifestyle shoots with refined presence.', badge: 'Brand Ready' },
    { initials: 'KD', name: 'Kabir Das', role: 'Content Creator', specialty: 'Short-form storytelling for high-conversion digital campaigns.', badge: 'Campaign Pick' },
    { initials: 'NV', name: 'Naina Verma', role: 'Voice Artist', specialty: 'Warm, premium and adaptable voice delivery for launches.', badge: 'Studio Ready' },
  ];

  itServices: ServiceCard[] = [
    { title: 'Website Development', description: 'Fast, responsive brand websites with a premium UI foundation.', icon: '🌐' },
    { title: 'Web Application Development', description: 'Custom applications built for internal tools, portals and workflows.', icon: '🧩' },
    { title: 'Mobile App Development', description: 'iOS and Android experiences designed for modern users.', icon: '📱' },
    { title: 'CRM Solutions', description: 'Lead tracking and customer relationship systems that scale.', icon: '🗂️' },
    { title: 'ERP Systems', description: 'Process automation for enterprise operations and visibility.', icon: '🏢' },
    { title: 'LMS Platforms', description: 'Learning platforms for training, onboarding and certification.', icon: '🎓' },
    { title: 'E-Commerce Solutions', description: 'Elegant commerce builds that convert with confidence.', icon: '🛍️' },
    { title: 'Cloud Solutions', description: 'Scalable infrastructure and deployment support.', icon: '☁️' },
    { title: 'Technical Support', description: 'Responsive issue handling and system care.', icon: '🛠️' },
    { title: 'Website Maintenance', description: 'Long-term upkeep, optimisation and release support.', icon: '🔧' },
  ];

  itMetrics: MetricCard[] = [
    { value: '120+', label: 'Projects Delivered' },
    { value: '40+', label: 'Technologies Used' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Availability' },
  ];

  itWorkflow: WorkflowStep[] = [
    { title: 'Discovery', description: 'We map business goals, system needs and user expectations.' },
    { title: 'Architecture', description: 'We design scalable digital workflows and system blueprints.' },
    { title: 'Build', description: 'We ship modern interfaces, integrations and secure experiences.' },
    { title: 'Support', description: 'We maintain, optimise and improve with ongoing care.' },
  ];

  workforceServices: ServiceCard[] = [
    { title: 'Technical Staffing', description: 'Vetted engineers, developers and specialist tech support.', icon: '💻' },
    { title: 'Non Technical Staffing', description: 'Operations, admin and business support talent.', icon: '👔' },
    { title: 'Contract Staffing', description: 'Flexible placements for short-term delivery needs.', icon: '📄' },
    { title: 'Project Staffing', description: 'Teams assembled for focused business outcomes.', icon: '📦' },
    { title: 'Creative Staffing', description: 'Production, editing and creative specialists.', icon: '🎨' },
    { title: 'Marketing Staffing', description: 'Campaign and growth professionals for brand teams.', icon: '📣' },
    { title: 'Educational Staffing', description: 'Training and learning support talent for institutions.', icon: '🏫' },
    { title: 'Event Staffing', description: 'On-ground support for launches, activations and events.', icon: '🎪' },
  ];

  industries: IndustryItem[] = [
    { name: 'IT', icon: '💻' },
    { name: 'Education', icon: '🏫' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Retail', icon: '🛍️' },
    { name: 'Government Projects', icon: '🏛️' },
    { name: 'Media', icon: '🎥' },
    { name: 'Hospitality', icon: '🏨' },
    { name: 'Corporate Organizations', icon: '🏢' },
  ];

  workforceWorkflow: WorkflowStep[] = [
    { title: 'Requirement Assessment', description: 'Clarify role requirements, timelines and workforce goals.' },
    { title: 'Talent Sourcing', description: 'Source vetted candidates from relevant skill pools.' },
    { title: 'Screening', description: 'Evaluate fit, capability and project readiness.' },
    { title: 'Deployment', description: 'Onboard and deploy with confidence and support.' },
    { title: 'Support', description: 'Track performance and maintain operational continuity.' },
  ];

  registrationRoles: RegistrationRole[] = [
    { slug: 'actor', title: 'Actor Registration', description: 'For film, ad and performance casting opportunities.', icon: '🎭' },
    { slug: 'model', title: 'Model Registration', description: 'For fashion, beauty and commercial brand shoots.', icon: '📸' },
    { slug: 'influencer', title: 'Influencer Registration', description: 'For creator partnerships and campaign collaborations.', icon: '✨' },
    { slug: 'photographer', title: 'Photographer Registration', description: 'For editorial, product and campaign photography.', icon: '📷' },
    { slug: 'videographer', title: 'Videographer Registration', description: 'For reels, shoots and motion-led storytelling.', icon: '🎥' },
    { slug: 'designer', title: 'Graphic Designer Registration', description: 'For branding, social and visual communication roles.', icon: '🎨' },
    { slug: 'writer', title: 'Content Writer Registration', description: 'For brand voice, copy and editorial content needs.', icon: '📝' },
    { slug: 'media-professional', title: 'Media Professional Registration', description: 'For anchors, voice talent, dancers and hybrid roles.', icon: '🎤' },
  ];

  trainingPrograms: TrainingProgram[] = [
    { title: 'Digital Marketing', description: 'SEO, social media, paid media and analytics fundamentals.', icon: '📣' },
    { title: 'Web Development', description: 'Modern websites, responsive UI and application basics.', icon: '🧑‍💻' },
    { title: 'Graphic Design', description: 'Brand identity, layouts and visual storytelling systems.', icon: '🎨' },
    { title: 'Video Editing', description: 'Reels, shorts and polished narrative editing workflows.', icon: '🎞️' },
    { title: 'Social Media Management', description: 'Community, content and channel planning.', icon: '📱' },
    { title: 'Communication Skills', description: 'Presentation, confidence and client-ready communication.', icon: '🗣️' },
    { title: 'Interview Preparation', description: 'Interview readiness, confidence and portfolio polish.', icon: '🎯' },
    { title: 'Career Development', description: 'Personal branding, goal setting and growth planning.', icon: '🚀' },
  ];

  trainingJourney: WorkflowStep[] = [
    { title: 'Learn', description: 'Understand the core skills, tools and language of the field.' },
    { title: 'Practice', description: 'Apply concepts through projects, exercises and guided feedback.' },
    { title: 'Certify', description: 'Validate skills with a structured learning milestone.' },
    { title: 'Grow', description: 'Use the training to move into stronger roles and opportunities.' },
  ];

  trainingStories: TrainingStory[] = [
    {
      initials: 'PS',
      name: 'Priya Sharma',
      outcome: 'Digital Marketing Specialist',
      quote: 'The training helped me move from learner to job-ready professional with clarity and confidence.',
    },
    {
      initials: 'AK',
      name: 'Aman Khan',
      outcome: 'Video Editor',
      quote: 'The practical assignments and mentorship made the learning journey feel real and career-focused.',
    },
  ];

  openRegistration(role: RegistrationRole): void {
    this.selectedRegistration.set(role);
  }

  closeRegistration(): void {
    this.selectedRegistration.set(null);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const motionTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    motionTimeline.from('.foundation-timeline-item', {
      opacity: 0,
      y: 28,
      duration: 0.7,
      stagger: 0.12,
    });
    gsap.from('.ecosystem-card', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.2,
    });
    gsap.from('.career-card', {
      opacity: 0,
      scale: 0.96,
      duration: 0.6,
      stagger: 0.08,
      delay: 0.3,
    });
    gsap.to('.foundation-orb', {
      y: 18,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4,
    });
  }
}
