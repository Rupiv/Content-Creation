import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-pink/8 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Our Work</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          <span class="gradient-text">Portfolio</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          A curated selection of our finest campaigns, productions, and creative collaborations.
        </p>
      </div>
    </section>

    <!-- FILTER TABS -->
    <section class="px-6 py-8 bg-brand-black sticky top-20 z-30">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          @for (filter of filters; track filter) {
            <button
              class="px-5 py-2 rounded-full font-poppins text-sm whitespace-nowrap transition-all duration-300"
              [class.bg-brand-gold]="activeFilter() === filter"
              [class.text-brand-black]="activeFilter() === filter"
              [class.font-semibold]="activeFilter() === filter"
              [class.bg-brand-white/5]="activeFilter() !== filter"
              [class.text-brand-white/60]="activeFilter() !== filter"
              [class.hover:text-brand-gold]="activeFilter() !== filter"
              (click)="setFilter(filter)"
            >
              {{ filter }}
            </button>
          }
        </div>
      </div>
    </section>

    <!-- MASONRY GRID -->
    <section class="section-padding bg-brand-black pt-8">
      <div class="max-w-7xl mx-auto">
        <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          @for (project of filteredProjects(); track project.title; let i = $index) {
            <div
              class="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              appScrollAnimation
              animationType="scale"
              [animationDelay]="i * 80"
            >
              <!-- Project card -->
              <div class="relative" [style.aspect-ratio]="project.ratio">
                <div class="absolute inset-0" [style.background]="project.gradient"></div>

                <!-- Hover overlay -->
                <div class="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/60 transition-all duration-500 flex items-end">
                  <div class="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span class="inline-block px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-poppins rounded-full mb-2">
                      {{ project.category }}
                    </span>
                    <h3 class="text-xl font-playfair text-brand-white mb-1">{{ project.title }}</h3>
                    <p class="text-brand-white/60 font-poppins text-sm">{{ project.description }}</p>
                  </div>
                </div>

                <!-- Type indicator -->
                @if (project.type === 'reel') {
                  <div class="absolute top-3 right-3 flex items-center gap-1 bg-brand-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span class="text-white font-poppins text-[10px]">Reel</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CASE STUDIES -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Case Studies"
          title="Transformations"
          description="Real results from real campaigns. See how we've helped brands achieve their goals."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          @for (study of caseStudies; track study.title; let i = $index) {
            <div
              class="glass-card overflow-hidden group hover:border-brand-gold/20 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Image area -->
              <div class="h-48 relative">
                <div class="absolute inset-0" [style.background]="study.gradient"></div>
                <div class="absolute inset-0 bg-brand-black/20"></div>
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-brand-gold/20 backdrop-blur-sm text-brand-gold text-xs font-poppins rounded-full">
                    {{ study.category }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-8">
                <h3 class="text-xl font-playfair text-brand-white mb-3 group-hover:text-brand-gold transition-colors">
                  {{ study.title }}
                </h3>
                <p class="text-brand-white/50 font-poppins text-sm mb-6">{{ study.description }}</p>

                <!-- Results -->
                <div class="grid grid-cols-3 gap-4">
                  @for (result of study.results; track result.label) {
                    <div class="text-center">
                      <div class="text-brand-gold font-playfair font-bold text-lg">{{ result.value }}</div>
                      <div class="text-brand-white/40 font-poppins text-[10px] uppercase">{{ result.label }}</div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `],
})
export class PortfolioComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  activeFilter = signal('All');

  filters = ['All', 'Campaigns', 'Reels', 'Editorial', 'Branding', 'Events'];

  projects = [
    { title: 'Luxe Beauty Launch', category: 'Campaigns', type: 'image', ratio: '4/5', description: 'Premium beauty brand campaign', gradient: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)' },
    { title: 'Summer Fashion Reel', category: 'Reels', type: 'reel', ratio: '9/16', description: '5M+ views fashion content', gradient: 'linear-gradient(135deg, #FF2E88 0%, #1A1A1A 100%)' },
    { title: 'Editorial Shoot', category: 'Editorial', type: 'image', ratio: '3/4', description: 'High-fashion editorial series', gradient: 'linear-gradient(180deg, #D4AF37 0%, #0A0A0A 100%)' },
    { title: 'Brand Identity', category: 'Branding', type: 'image', ratio: '1/1', description: 'Complete brand overhaul', gradient: 'linear-gradient(135deg, #1A1A1A 0%, #D4AF37 100%)' },
    { title: 'Product Launch Event', category: 'Events', type: 'image', ratio: '16/9', description: 'Exclusive launch party', gradient: 'linear-gradient(135deg, #FF2E88 0%, #D4AF37 100%)' },
    { title: 'Influencer Campaign', category: 'Campaigns', type: 'reel', ratio: '9/16', description: '10 influencers, 50M reach', gradient: 'linear-gradient(45deg, #D4AF37 0%, #FF2E88 100%)' },
    { title: 'Lifestyle Content', category: 'Reels', type: 'reel', ratio: '9/16', description: 'Aesthetic lifestyle reels', gradient: 'linear-gradient(225deg, #0A0A0A 0%, #D4AF37 100%)' },
    { title: 'Fashion Week', category: 'Editorial', type: 'image', ratio: '3/2', description: 'Fashion week coverage', gradient: 'linear-gradient(135deg, #D4AF37 0%, #FF2E88 50%, #1A1A1A 100%)' },
    { title: 'Corporate Rebrand', category: 'Branding', type: 'image', ratio: '4/3', description: 'Tech startup rebrand', gradient: 'linear-gradient(180deg, #1A1A1A 0%, #FF2E88 100%)' },
  ];

  caseStudies = [
    {
      title: 'Luxe Beauty - 400% Growth',
      category: 'Beauty & Fashion',
      description: 'How we transformed a local beauty brand into a national sensation with strategic influencer marketing and cinematic content.',
      gradient: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)',
      results: [
        { value: '400%', label: 'Growth' },
        { value: '50M+', label: 'Reach' },
        { value: '2.5x', label: 'ROI' },
      ],
    },
    {
      title: 'TechStart - Viral Launch',
      category: 'Technology',
      description: 'A product launch campaign that broke the internet with creative reels and strategic influencer collaborations.',
      gradient: 'linear-gradient(135deg, #FF2E88 0%, #1A1A1A 100%)',
      results: [
        { value: '10M+', label: 'Views' },
        { value: '500K', label: 'Signups' },
        { value: '#1', label: 'Trending' },
      ],
    },
  ];

  filteredProjects = signal(this.projects);

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
    if (filter === 'All') {
      this.filteredProjects.set(this.projects);
    } else {
      this.filteredProjects.set(this.projects.filter(p => p.category === filter));
    }
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Portfolio | Yashvi Bagga Productions',
      description: 'Explore our portfolio of premium campaigns, cinematic reels, editorial shoots, and brand transformations.',
    });
  }
}
