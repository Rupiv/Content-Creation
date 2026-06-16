import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../../core/services/seo.service';

interface TalentPageConfig {
  mode: 'casting' | 'network';
  kicker: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel: string;
  secondaryLink: string;
  stats: { value: string; label: string }[];
  categories: { icon: string; name: string; description: string }[];
  profiles: { initials: string; name: string; role: string; summary: string; badge: string }[];
  workflow: { title: string; description: string }[];
  seoTitle: string;
  seoDescription: string;
}

const CASTING_PAGE: TalentPageConfig = {
  mode: 'casting',
  kicker: 'Casting Services',
  title: 'Casting Services for Luxury Campaigns',
  description: 'Find the right actors, models and creators for cinematic campaigns, premium brand activations and editorial productions.',
  primaryLabel: 'Register as Talent',
  primaryLink: '/join-network',
  secondaryLabel: 'Explore the Ecosystem',
  secondaryLink: '/',
  stats: [
    { value: '500+', label: 'Verified Profiles' },
    { value: '75+', label: 'Brand Collaborations' },
    { value: '12', label: 'Talent Categories' },
    { value: '24/7', label: 'Casting Support' },
  ],
  categories: [
    { icon: '🎭', name: 'Actors', description: 'Commercial, screen and performance-ready talent.' },
    { icon: '📸', name: 'Models', description: 'Fashion, beauty and editorial-facing profiles.' },
    { icon: '✨', name: 'Influencers', description: 'Creators with audience fit and brand alignment.' },
    { icon: '🎙️', name: 'Voice Artists', description: 'Narration, dub and brand voice delivery.' },
    { icon: '🎤', name: 'Anchors', description: 'Live hosting and on-camera presentation talent.' },
    { icon: '💃', name: 'Dancers', description: 'Motion, stage and campaign choreography talent.' },
  ],
  profiles: [
    { initials: 'AS', name: 'Aarav Singh', role: 'Actor', summary: 'Commercial performance with an editorial edge.', badge: 'Camera Ready' },
    { initials: 'MR', name: 'Mira Rao', role: 'Model', summary: 'Luxury fashion presence for campaign and runway work.', badge: 'Fashion Pick' },
    { initials: 'KD', name: 'Kabir Das', role: 'Creator', summary: 'Short-form storyteller with a strong brand pulse.', badge: 'Digital Reach' },
    { initials: 'NV', name: 'Naina Verma', role: 'Voice Artist', summary: 'Warm premium voice delivery for launches and films.', badge: 'Studio Ready' },
  ],
  workflow: [
    { title: 'Briefing', description: 'We capture the casting brief, mood and deliverables.' },
    { title: 'Shortlisting', description: 'We match roles with a curated shortlist of profiles.' },
    { title: 'Selection', description: 'Auditions, approvals and call-sheet coordination.' },
    { title: 'Delivery', description: 'Production support, feedback and follow-up management.' },
  ],
  seoTitle: 'Casting Services | YASHVI BAGGA PRODUCTIONS',
  seoDescription: 'Luxury casting services for actors, models, influencers, voice artists and campaign-ready collaborators.',
};

const NETWORK_PAGE: TalentPageConfig = {
  mode: 'network',
  kicker: 'Talent Network',
  title: 'Talent Network & Collaboration Hub',
  description: 'A premium creator network built for long-term partnerships, campaign collaborations and high-quality brand outcomes.',
  primaryLabel: 'Become a Creator',
  primaryLink: '/join-network',
  secondaryLabel: 'View Casting Services',
  secondaryLink: '/casting-services',
  stats: [
    { value: '1,200+', label: 'Network Members' },
    { value: '40+', label: 'Creator Niches' },
    { value: '96%', label: 'Response Quality' },
    { value: '48h', label: 'Average Match Time' },
  ],
  categories: [
    { icon: '📷', name: 'Photographers', description: 'Editorial, product and campaign imagery.' },
    { icon: '🎥', name: 'Videographers', description: 'Motion-led storytelling and social-first capture.' },
    { icon: '🪄', name: 'Content Creators', description: 'Reels, shorts and creator-led content systems.' },
    { icon: '🎨', name: 'Designers', description: 'Visual systems, graphics and brand assets.' },
    { icon: '📝', name: 'Writers', description: 'Copy, scripts and story-first messaging.' },
    { icon: '🎶', name: 'Performers', description: 'Music, movement and entertainment talent.' },
  ],
  profiles: [
    { initials: 'TG', name: 'Tanvi Gupta', role: 'Designer', summary: 'Brand-first visual systems with premium polish.', badge: 'Design Partner' },
    { initials: 'RV', name: 'Rohan Verma', role: 'Videographer', summary: 'Cinematic motion and premium content framing.', badge: 'Motion Ready' },
    { initials: 'SK', name: 'Simran Kaur', role: 'Writer', summary: 'Story-driven copy for launches, campaigns and brands.', badge: 'Narrative Expert' },
    { initials: 'PN', name: 'Pooja Nair', role: 'Photographer', summary: 'Elegant portrait and lifestyle imagery with depth.', badge: 'Visual Story' },
  ],
  workflow: [
    { title: 'Join', description: 'Register your profile and share your creative focus.' },
    { title: 'Curate', description: 'We review your work and align you with the right category.' },
    { title: 'Match', description: 'Brands and projects are matched based on fit and need.' },
    { title: 'Grow', description: 'Build recurring opportunities and stronger visibility.' },
  ],
  seoTitle: 'Talent Network | YASHVI BAGGA PRODUCTIONS',
  seoDescription: 'Join the YASHVI BAGGA PRODUCTIONS talent network for collaborations, creator partnerships and premium brand opportunities.',
};

@Component({
  selector: 'app-talent-hub',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <section class="relative min-h-[72vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-24 right-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-[120px]"></div>
        <div class="absolute bottom-16 left-10 h-72 w-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
        <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(0deg, transparent 24%, rgba(212, 175, 55, 0.08) 25%, rgba(212, 175, 55, 0.08) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 0.08) 75%, rgba(212, 175, 55, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(212, 175, 55, 0.08) 25%, rgba(212, 175, 55, 0.08) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 0.08) 75%, rgba(212, 175, 55, 0.08) 76%, transparent 77%, transparent); background-size: 50px 50px;"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">{{ page.kicker }}</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">{{ page.title }}</h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">{{ page.description }}</p>

        <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style="animation-delay: 0.6s;">
          <app-magnetic-button>
            <a [routerLink]="page.primaryLink" class="inline-flex items-center gap-3 px-8 py-3 bg-brand-gold text-brand-black font-poppins font-medium rounded-full hover:bg-brand-white transition-all duration-300">
              {{ page.primaryLabel }}
            </a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a [routerLink]="page.secondaryLink" class="inline-flex items-center gap-3 px-8 py-3 border border-brand-white/15 text-brand-white font-poppins font-medium rounded-full hover:border-brand-gold hover:text-brand-gold transition-all duration-300">
              {{ page.secondaryLabel }}
            </a>
          </app-magnetic-button>
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Network Metrics"
          title="Built For Premium Matchmaking"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          @for (metric of page.stats; track metric.label) {
            <div class="rounded-[24px] border border-brand-white/10 bg-brand-dark/80 p-6 text-center" appScrollAnimation animationType="fade-up">
              <p class="text-4xl font-playfair text-brand-gold">{{ metric.value }}</p>
              <p class="mt-2 text-brand-white/55 text-sm uppercase tracking-[0.28em]">{{ metric.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.07),_transparent_30%)]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Category Map"
          title="Talent Categories"
          description="A clear view of the people we can cast, manage and collaborate with."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (category of page.categories; track category.name) {
            <div class="rounded-[28px] border border-brand-white/10 bg-brand-black/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/25" appScrollAnimation animationType="fade-up">
              <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl text-brand-gold mb-4">
                {{ category.icon }}
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ category.name }}</h3>
              <p class="text-brand-white/60 text-sm leading-6">{{ category.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-black relative">
      <div class="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Featured Profiles"
          title="Select Profiles With Strong Presence"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          @for (profile of page.profiles; track profile.name) {
            <div class="rounded-[30px] border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25" appScrollAnimation animationType="fade-up">
              <div class="flex items-center gap-4">
                <div class="flex h-20 w-20 items-center justify-center rounded-full border border-brand-gold/20 bg-[radial-gradient(circle,_rgba(212,175,55,0.22),_rgba(17,17,17,0.96))] text-xl font-playfair text-brand-white">
                  {{ profile.initials }}
                </div>
                <div>
                  <p class="text-brand-white font-medium">{{ profile.name }}</p>
                  <p class="text-brand-gold text-xs uppercase tracking-[0.28em] mt-1">{{ profile.role }}</p>
                </div>
              </div>
              <p class="mt-5 text-brand-white/60 text-sm leading-6">{{ profile.summary }}</p>
              <div class="mt-5 inline-flex rounded-full border border-brand-gold/15 bg-brand-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-brand-gold">
                {{ profile.badge }}
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,45,136,0.08),_transparent_28%)]"></div>
      <div class="relative max-w-7xl mx-auto grid gap-10 lg:grid-cols-[0.96fr_1.04fr] items-start">
        <div class="rounded-[34px] border border-brand-white/10 bg-brand-black/80 p-8">
          <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-5">Collaboration Workflow</p>
          <div class="space-y-5">
            @for (step of page.workflow; track step.title; let i = $index) {
              <div class="flex items-start gap-4" appScrollAnimation animationType="fade-up">
                <div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold text-sm">{{ i + 1 }}</div>
                <div>
                  <h3 class="text-brand-white font-medium">{{ step.title }}</h3>
                  <p class="text-brand-white/55 text-sm leading-6">{{ step.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="rounded-[34px] border border-brand-white/10 bg-brand-black/80 p-8">
          <p class="text-brand-gold text-xs uppercase tracking-[0.3em] mb-4">Ready to Start</p>
          <h2 class="text-3xl font-playfair text-brand-white mb-4">A premium network designed for long-term value.</h2>
          <p class="text-brand-white/60 leading-7 mb-8">
            Whether you are casting for a campaign or joining the network as a creator, our process is built to keep the experience elegant, fast and future-ready.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <app-magnetic-button>
              <a [routerLink]="page.primaryLink" class="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-medium text-brand-black transition-colors duration-300 hover:bg-brand-white">
                {{ page.primaryLabel }}
              </a>
            </app-magnetic-button>
            <app-magnetic-button>
              <a [routerLink]="page.secondaryLink" class="inline-flex items-center justify-center rounded-full border border-brand-white/15 px-6 py-3 font-medium text-brand-white transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold">
                {{ page.secondaryLabel }}
              </a>
            </app-magnetic-button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class TalentHubComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  page: TalentPageConfig = CASTING_PAGE;

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'] === 'network' ? 'network' : 'casting';
    this.page = mode === 'network' ? NETWORK_PAGE : CASTING_PAGE;

    this.seoService.updateMetaTags({
      title: this.page.seoTitle,
      description: this.page.seoDescription,
      url: `https://yashvibagga.com/${this.page.mode === 'network' ? 'talent-network' : 'casting-services'}`,
    });
  }
}
