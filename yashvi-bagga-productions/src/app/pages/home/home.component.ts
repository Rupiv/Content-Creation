import { Component, OnInit, OnDestroy, inject, AfterViewInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { AnimationService } from '../../core/services/animation.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Video Background Placeholder -->
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black"></div>
        <!-- Animated gradient background as video placeholder -->
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/20 rounded-full blur-[120px] animate-float"></div>
          <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-pink/15 rounded-full blur-[100px] animate-float" style="animation-delay: -3s;"></div>
          <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] animate-float" style="animation-delay: -1.5s;"></div>
        </div>
      </div>

      <!-- Grain overlay -->
      <div class="absolute inset-0 noise-overlay pointer-events-none"></div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center pt-32 md:pt-40">
        <!-- Tagline -->
        <div class="mb-8 overflow-hidden">
          <p class="font-poppins text-brand-gold text-sm md:text-base tracking-[4px] uppercase animate-fade-in" style="animation-delay: 0.5s;">
            Premium Creative Agency
          </p>
        </div>

        <!-- Main Headline -->
        <div class="mb-8 overflow-hidden">
          <h1 class="heading-xl text-brand-white animate-slide-up" style="animation-delay: 0.8s;">
            Creating <span class="gradient-text">Influence</span>.<br/>
            Building <span class="gradient-text-pink">Brands</span>.<br/>
            Producing Digital <span class="gradient-text">Impact</span>.
          </h1>
        </div>

        <!-- Subtitle -->
        <div class="mb-12 overflow-hidden">
          <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 1.1s;">
            We are a luxury creative media & digital production agency helping brands, creators
            and businesses grow through powerful storytelling and cinematic content.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 1.4s;">
          <app-magnetic-button>
            <a routerLink="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500 group">
              Start Your Project
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a routerLink="/portfolio" class="inline-flex items-center gap-2 px-8 py-4 border border-brand-white/20 text-brand-white font-poppins font-medium rounded-full hover:border-brand-gold hover:text-brand-gold transition-all duration-500">
              View Our Work
            </a>
          </app-magnetic-button>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div class="w-6 h-10 border-2 border-brand-white/30 rounded-full flex items-start justify-center p-1.5">
            <div class="w-1.5 h-3 bg-brand-gold rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF / STATS -->
    <section class="section-padding bg-brand-black relative">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-gray/30 to-brand-black"></div>
      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8" appScrollAnimation animationType="fade-up">
          @for (stat of stats; track stat.label) {
            <div class="text-center group">
              <div class="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                {{ stat.value }}
              </div>
              <div class="text-brand-white/50 font-poppins text-sm uppercase tracking-wider">
                {{ stat.label }}
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- FEATURED SERVICES -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <!-- Background accents -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px]"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="What We Do"
          title="Our Services"
          description="We craft digital experiences that captivate audiences and drive results."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of featuredServices; track service.title; let i = $index) {
            <div
              class="glass-card p-8 group hover:border-brand-gold/30 transition-all duration-500 hover:-translate-y-2"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                <span class="text-2xl">{{ service.icon }}</span>
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                {{ service.title }}
              </h3>
              <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">
                {{ service.description }}
              </p>
            </div>
          }
        </div>

        <div class="text-center mt-12" appScrollAnimation animationType="fade-up">
          <a routerLink="/services" class="inline-flex items-center gap-2 text-brand-gold font-poppins font-medium hover:gap-4 transition-all duration-300">
            Explore All Services
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- FEATURED CAMPAIGNS / REELS SHOWCASE -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Work"
          title="Featured Campaigns"
          description="Cinematic content that tells stories and builds brands."
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          @for (reel of reelsShowcase; track reel.title; let i = $index) {
            <div
              class="relative group rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer"
              appScrollAnimation
              animationType="scale"
              [animationDelay]="i * 80"
            >
              <!-- Placeholder gradient background -->
              <div class="absolute inset-0" [style.background]="reel.gradient"></div>

              <!-- Overlay -->
              <div class="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-all duration-500"></div>

              <!-- Play button -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div class="w-14 h-14 rounded-full bg-brand-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>

              <!-- Info -->
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-black/80 to-transparent">
                <p class="text-brand-white font-poppins text-xs font-medium">{{ reel.title }}</p>
                <p class="text-brand-white/50 font-poppins text-[10px]">{{ reel.views }} views</p>
              </div>

              <!-- Reel icon -->
              <div class="absolute top-3 right-3">
                <svg class="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CLIENT TESTIMONIALS PREVIEW -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/3 rounded-full blur-[150px]"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Testimonials"
          title="What Brands Say"
          description="Trusted by leading brands and creators across India."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (testimonial of testimonials; track testimonial.name; let i = $index) {
            <div
              class="glass-card p-8 hover:border-brand-gold/20 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Stars -->
              <div class="flex gap-1 mb-4">
                @for (_ of [1,2,3,4,5]; track _) {
                  <svg class="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                }
              </div>

              <!-- Quote -->
              <p class="text-brand-white/70 font-poppins text-sm leading-relaxed mb-6 italic">
                "{{ testimonial.quote }}"
              </p>

              <!-- Author -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-pink/30 flex items-center justify-center">
                  <span class="text-brand-white font-poppins font-semibold text-sm">{{ testimonial.initials }}</span>
                </div>
                <div>
                  <p class="text-brand-white font-poppins text-sm font-medium">{{ testimonial.name }}</p>
                  <p class="text-brand-white/40 font-poppins text-xs">{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- COLLABORATION CTA -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-pink/5"></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center" appScrollAnimation animationType="scale">
        <span class="inline-block text-brand-gold font-poppins text-sm font-medium tracking-[3px] uppercase mb-4">
          Ready to Collaborate?
        </span>
        <h2 class="heading-lg text-brand-white mb-6">
          Let's Create Something <span class="gradient-text">Extraordinary</span>
        </h2>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto mb-10">
          Whether you're a brand looking for impact or a creator ready to grow,
          we'd love to hear from you.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <app-magnetic-button>
            <a routerLink="/collaborations" class="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500">
              Partner With Us
            </a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a routerLink="/contact" class="inline-flex items-center gap-2 px-8 py-4 border border-brand-gold/40 text-brand-gold font-poppins font-medium rounded-full hover:bg-brand-gold hover:text-brand-black transition-all duration-500">
              Get In Touch
            </a>
          </app-magnetic-button>
        </div>
      </div>
    </section>

    <!-- INSTAGRAM FEED SECTION -->
    <section class="section-padding bg-brand-black relative">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Follow Us"
          title="&#64;yashvibagga"
          description="Behind the scenes, latest campaigns, and creative inspiration."
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          @for (post of instagramPosts; track post.id; let i = $index) {
            <a
              href="https://instagram.com/yashvibagga"
              target="_blank"
              rel="noopener"
              class="relative aspect-square rounded-lg overflow-hidden group"
              appScrollAnimation
              animationType="scale"
              [animationDelay]="i * 60"
            >
              <div class="absolute inset-0" [style.background]="post.gradient"></div>
              <div class="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-all duration-300 flex items-center justify-center">
                <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly animationService = inject(AnimationService);
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  stats = [
    { value: '500+', label: 'Campaigns' },
    { value: '200+', label: 'Brands' },
    { value: '50M+', label: 'Reach' },
    { value: '100+', label: 'Creators' },
  ];

  featuredServices = [
    { icon: '📱', title: 'Social Media Management', description: 'Strategic social media presence that grows your brand and engages your audience across all platforms.' },
    { icon: '🌟', title: 'Influencer Marketing', description: 'Connect with the right influencers to amplify your brand message and reach millions.' },
    { icon: '🎬', title: 'Content Creation', description: 'Cinematic reels, editorial shoots, and premium content that stops the scroll.' },
    { icon: '🚀', title: 'Brand Promotions', description: 'Strategic brand campaigns that drive awareness, engagement, and conversions.' },
    { icon: '🤝', title: 'Talent Collaborations', description: 'Connecting brands with top-tier creators for authentic, impactful partnerships.' },
    { icon: '🎨', title: 'Creative Production', description: 'End-to-end production from concept to delivery with cinematic quality.' },
  ];

  reelsShowcase = [
    { title: 'Fashion Campaign', views: '2.4M', gradient: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)' },
    { title: 'Brand Story', views: '1.8M', gradient: 'linear-gradient(135deg, #FF2E88 0%, #1A1A1A 100%)' },
    { title: 'Product Launch', views: '3.1M', gradient: 'linear-gradient(135deg, #1A1A1A 0%, #D4AF37 100%)' },
    { title: 'Creator Collab', views: '5.2M', gradient: 'linear-gradient(135deg, #FF2E88 0%, #D4AF37 100%)' },
    { title: 'Editorial Shoot', views: '1.5M', gradient: 'linear-gradient(45deg, #D4AF37 0%, #FF2E88 100%)' },
    { title: 'Lifestyle Reel', views: '4.7M', gradient: 'linear-gradient(180deg, #0A0A0A 0%, #D4AF37 100%)' },
    { title: 'Music Video', views: '8.3M', gradient: 'linear-gradient(135deg, #FF2E88 0%, #0A0A0A 100%)' },
    { title: 'Travel Campaign', views: '2.9M', gradient: 'linear-gradient(225deg, #D4AF37 0%, #FF2E88 100%)' },
  ];

  testimonials = [
    { name: 'Priya Sharma', initials: 'PS', role: 'CEO, Luxe Beauty', quote: 'Yashvi Bagga Productions transformed our brand presence. The content quality is unmatched and our engagement grew 400%.' },
    { name: 'Rahul Verma', initials: 'RV', role: 'Founder, TechStart', quote: 'Working with this team was incredible. They understood our vision and delivered beyond expectations. Truly premium quality.' },
    { name: 'Ananya Patel', initials: 'AP', role: 'Fashion Influencer', quote: 'The most professional production team I\'ve worked with. Every collaboration feels like creating art. Absolutely recommend!' },
  ];

  instagramPosts = [
    { id: 1, gradient: 'linear-gradient(135deg, #D4AF37 0%, #8B7355 100%)' },
    { id: 2, gradient: 'linear-gradient(135deg, #FF2E88 0%, #CC2470 100%)' },
    { id: 3, gradient: 'linear-gradient(135deg, #1A1A1A 0%, #3A3A3A 100%)' },
    { id: 4, gradient: 'linear-gradient(135deg, #D4AF37 0%, #FF2E88 100%)' },
    { id: 5, gradient: 'linear-gradient(135deg, #2A2A2A 0%, #D4AF37 100%)' },
    { id: 6, gradient: 'linear-gradient(135deg, #FF2E88 0%, #D4AF37 100%)' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Yashvi Bagga Productions | Premium Creative Media & Digital Production Agency',
      description: 'Creating Influence. Building Brands. Producing Digital Impact. Premium creative media and influencer marketing agency.',
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animationService.refresh();
    }
  }

  ngOnDestroy(): void {
    this.animationService.killAll();
  }
}
