import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Multi-Vertical Excellence</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Our <span class="gradient-text">Business Verticals</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Comprehensive solutions across creative media, technology, staffing, and professional development.
          Your complete partner for business growth and digital transformation.
        </p>
      </div>
    </section>

    <!-- FOUR PILLARS - BUSINESS VERTICALS -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Four Pillars of Excellence"
          title="Our Business Ecosystem"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <!-- Creative Media & Branding -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-brand-gold to-brand-pink rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div class="relative bg-brand-dark/90 backdrop-blur-sm border border-brand-gold/30 rounded-xl p-12 h-full group-hover:border-brand-gold/60 transition-all duration-500 flex flex-col">
              <div class="text-5xl mb-6">🎨</div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">Creative Media & Branding</h3>
              <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                Premium creative solutions including brand strategy, content creation, video production, and social media management that elevates your brand presence.
              </p>
              <div class="space-y-2 mb-8">
                <p class="text-brand-white/70 font-poppins text-sm">✓ Brand Strategy & Identity</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Content Creation & Media</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Video Production</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Social Media Management</p>
              </div>
              <a routerLink="/services/creative-media" class="inline-flex items-center gap-3 px-6 py-3 bg-brand-gold text-brand-black font-poppins font-medium rounded-lg hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                Explore Service
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>

          <!-- IT Solutions & Services -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
            [animationDelay]="100"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div class="relative bg-brand-dark/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-12 h-full group-hover:border-cyan-500/60 transition-all duration-500 flex flex-col">
              <div class="text-5xl mb-6">💻</div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">IT Solutions & Services</h3>
              <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                Enterprise-grade technology solutions including web development, mobile apps, cloud infrastructure, and digital transformation services.
              </p>
              <div class="space-y-2 mb-8">
                <p class="text-brand-white/70 font-poppins text-sm">✓ Web & Mobile Development</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Cloud Solutions</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Digital Transformation</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Enterprise Support</p>
              </div>
              <a routerLink="/services/it-solutions" class="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500 text-brand-black font-poppins font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                Explore Service
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>

          <!-- Manpower Outsourcing -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
            [animationDelay]="200"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div class="relative bg-brand-dark/90 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-12 h-full group-hover:border-emerald-500/60 transition-all duration-500 flex flex-col">
              <div class="text-5xl mb-6">👥</div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">Manpower Outsourcing</h3>
              <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                Strategic staffing solutions for technical and non-technical roles, connecting organizations with top talent for permanent and contract positions.
              </p>
              <div class="space-y-2 mb-8">
                <p class="text-brand-white/70 font-poppins text-sm">✓ Technical Staffing</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Contract & Permanent Hiring</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Remote Workforce Solutions</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ HR Support Services</p>
              </div>
              <a routerLink="/services/manpower-outsourcing" class="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 text-brand-black font-poppins font-medium rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                Explore Service
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>

          <!-- Vocational Training -->
          <div 
            class="group relative overflow-hidden rounded-xl"
            appScrollAnimation
            animationType="fade-up"
            [animationDelay]="300"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div class="relative bg-brand-dark/90 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-12 h-full group-hover:border-yellow-500/60 transition-all duration-500 flex flex-col">
              <div class="text-5xl mb-6">🎓</div>
              <h3 class="text-3xl font-playfair text-brand-white mb-4">Vocational Training</h3>
              <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8 flex-grow">
                Comprehensive professional development programs including IT training, digital marketing, soft skills, and industry certifications for career growth.
              </p>
              <div class="space-y-2 mb-8">
                <p class="text-brand-white/70 font-poppins text-sm">✓ IT Training Programs</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Digital Skills</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Professional Certifications</p>
                <p class="text-brand-white/70 font-poppins text-sm">✓ Career Development</p>
              </div>
              <a routerLink="/services/vocational-training" class="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-brand-black font-poppins font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 w-fit">
                Explore Service
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CREATIVE SERVICES GRID - Legacy Services -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/3 via-transparent to-brand-pink/3"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Featured Services"
          title="Premium Creative Offerings"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          @for (service of services; track service.title; let i = $index) {
            <div
              class="glass-card p-8 group hover:border-brand-gold/30 transition-all duration-700 hover:-translate-y-3 relative overflow-hidden"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Hover gradient -->
              <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   [style.background]="'linear-gradient(135deg, ' + service.color + '08 0%, transparent 100%)'"></div>

              <div class="relative z-10">
                <!-- Icon -->
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                     [style.background]="service.color + '15'">
                  <span class="text-3xl">{{ service.icon }}</span>
                </div>

                <!-- Title -->
                <h3 class="text-xl font-playfair text-brand-white mb-4 group-hover:text-brand-gold transition-colors duration-300">
                  {{ service.title }}
                </h3>

                <!-- Description -->
                <p class="text-brand-white/50 font-poppins text-sm leading-relaxed mb-6">
                  {{ service.description }}
                </p>

                <!-- Features -->
                <ul class="space-y-2 mb-6">
                  @for (feature of service.features; track feature) {
                    <li class="flex items-center gap-2 text-brand-white/40 font-poppins text-xs">
                      <svg class="w-3 h-3 text-brand-gold shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      {{ feature }}
                    </li>
                  }
                </ul>

                <!-- CTA -->
                <a routerLink="/contact" class="inline-flex items-center gap-2 text-brand-gold font-poppins text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Get Started
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- PROCESS SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/3 via-transparent to-brand-pink/3"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Approach"
          title="How We Deliver Results"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (step of processSteps; track step.title; let i = $index) {
            <div
              class="relative text-center"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <div class="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-brand-gold/30 flex items-center justify-center">
                <span class="text-brand-gold font-playfair text-xl font-bold">{{ i + 1 }}</span>
              </div>
              <h4 class="text-lg font-playfair text-brand-white mb-3">{{ step.title }}</h4>
              <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">{{ step.description }}</p>

              <!-- Connector line -->
              @if (i < processSteps.length - 1) {
                <div class="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-brand-gold/30 to-transparent"></div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-brand-dark relative">
      <div class="max-w-4xl mx-auto text-center" appScrollAnimation animationType="scale">
        <h2 class="heading-lg text-brand-white mb-6">
          Ready to <span class="gradient-text">Transform</span> Your Business?
        </h2>
        <p class="body-lg text-brand-white/60 mb-10">
          Explore our comprehensive suite of services and find the perfect solution for your needs.
        </p>
        <app-magnetic-button>
          <a routerLink="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500">
            Get a Free Consultation
          </a>
        </app-magnetic-button>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class ServicesComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  services = [
    {
      icon: '📱',
      title: 'Social Media Management',
      description: 'Complete social media strategy, content planning, and community management that grows your brand presence across all platforms.',
      color: '#D4AF37',
      features: ['Content Strategy & Calendar', 'Community Management', 'Analytics & Reporting', 'Platform Optimization', 'Engagement Growth'],
    },
    {
      icon: '🌟',
      title: 'Influencer Marketing',
      description: 'Strategic influencer partnerships that amplify your message and connect your brand with the right audiences through authentic collaborations.',
      color: '#FF2E88',
      features: ['Influencer Discovery & Vetting', 'Campaign Strategy', 'Content Collaboration', 'Performance Tracking', 'ROI Optimization'],
    },
    {
      icon: '🎬',
      title: 'Content Creation',
      description: 'Premium cinematic content including reels, editorial shoots, brand films, and digital assets that stop the scroll and drive engagement.',
      color: '#D4AF37',
      features: ['Reels & Short-form Content', 'Brand Films & Videos', 'Photography & Editorials', 'Graphic Design', 'Motion Graphics'],
    },
    {
      icon: '🚀',
      title: 'Brand Promotions',
      description: 'Strategic brand campaigns that create buzz, drive awareness, and convert audiences into loyal customers through multi-channel promotion.',
      color: '#FF2E88',
      features: ['Campaign Strategy', 'Launch Events', 'Digital Advertising', 'PR & Media Coverage', 'Brand Activations'],
    },
    {
      icon: '🤝',
      title: 'Talent Collaborations',
      description: 'Connecting brands with the perfect creators and talent for impactful collaborations that resonate with target audiences.',
      color: '#D4AF37',
      features: ['Talent Sourcing', 'Contract Negotiation', 'Campaign Management', 'Performance Analytics', 'Long-term Partnerships'],
    },
    {
      icon: '🎨',
      title: 'Creative Production',
      description: 'Full-service creative production from concept development to final delivery, with cinematic quality standards at every step.',
      color: '#FF2E88',
      features: ['Concept Development', 'Pre-production Planning', 'Cinematic Production', 'Post-production', 'Multi-format Delivery'],
    },
  ];

  processSteps = [
    { title: 'Discover', description: 'Understanding your brand, goals, and audience deeply.' },
    { title: 'Strategize', description: 'Crafting a data-driven creative strategy.' },
    { title: 'Create', description: 'Producing premium content with cinematic quality.' },
    { title: 'Amplify', description: 'Maximizing reach and driving measurable results.' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Services | Yashvi Bagga Productions - Creative, IT, Staffing & Training',
      description: 'Explore our comprehensive business verticals: Creative Media & Branding, IT Solutions & Services, Manpower Outsourcing, and Vocational Training Programs.',
    });
  }
}
