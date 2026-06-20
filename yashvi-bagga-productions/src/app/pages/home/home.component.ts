import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';
import { EcosystemExpansionComponent } from './sections/ecosystem-expansion.component';
import { IndustriesComponent } from './sections/industries.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent, EcosystemExpansionComponent, IndustriesComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="relative min-h-screen overflow-hidden bg-brand-black text-brand-white">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black"></div>
      <div class="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-brand-pink/10 blur-[130px]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.06),_transparent_35%)] pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div class="space-y-10">
            <div class="overflow-hidden">
              <p class="font-poppins text-brand-gold text-sm tracking-[5px] uppercase mb-6 animate-fade-in inline-flex items-center" style="animation-delay: 0.4s;">
                <span class="inline-flex w-6 h-6 rounded-full bg-gradient-to-br from-brand-gold to-yellow-300 items-center justify-center overflow-hidden align-middle mr-0.5">
                  <img src="/LogoYB.png" alt="Yashvi Bagga Productions logo" class="w-full h-full object-cover" />
                </span>ASHVI BAGGA PRODUCTIONS
              </p>
            </div>

            <div class="overflow-hidden">
              <h1 class="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.05em] text-brand-white animate-slide-up" style="animation-delay: 0.6s;">
                Creating Stories.
                <span class="block mt-3 text-brand-gold">Building Influence.</span>
                <span class="block mt-3 text-brand-white">Producing Impact.</span>
              </h1>
            </div>

            <div class="max-w-2xl space-y-6 overflow-hidden">
              <p class="body-lg text-brand-white/70 animate-slide-up" style="animation-delay: 0.8s;">
                YASHVI BAGGA PRODUCTIONS is a next-generation creative media and digital production agency delivering impactful storytelling, influencer collaborations, social media growth and premium content experiences.
              </p>

              <div class="flex flex-col sm:flex-row gap-4 items-center animate-slide-up" style="animation-delay: 1s;">
                <app-magnetic-button>
                  <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-semibold rounded-full transition-all duration-500 hover:bg-brand-white">
                    Book a Consultation
                  </a>
                </app-magnetic-button>
                <app-magnetic-button>
                  <a routerLink="/portfolio" class="inline-flex items-center gap-3 px-8 py-4 border border-brand-white/20 text-brand-white font-medium rounded-full transition-all duration-500 hover:border-brand-gold hover:text-brand-gold">
                    Explore Our Work
                  </a>
                </app-magnetic-button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              @for (feature of heroFeatures; track feature.title) {
                <div class="group relative overflow-hidden rounded-[28px] border border-brand-white/10 bg-brand-dark/70 p-6 transition-all duration-500 hover:border-brand-gold/25 hover:bg-brand-black/80">
                  <div class="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-pink/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div class="relative z-10 space-y-3">
                    <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold">
                      {{ feature.icon }}
                    </div>
                    <h3 class="text-lg font-playfair text-brand-white">{{ feature.title }}</h3>
                    <p class="text-brand-white/60 text-sm leading-6">{{ feature.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="relative">
            <div class="relative overflow-hidden rounded-[40px] border border-brand-white/10 bg-brand-dark/90 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.15),_transparent_40%)]"></div>
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,45,136,0.16),_transparent_35%)]"></div>
              <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-black/80 to-transparent"></div>
              <div class="aspect-[9/12] bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
              <div class="absolute inset-0 bg-brand-black/30"></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <p class="mb-4 text-xs uppercase tracking-[0.32em] text-brand-gold/80">Featured Story</p>
                <h2 class="text-3xl font-playfair text-brand-white mb-4">The Editorial Vision Behind Every Frame</h2>
                <p class="text-brand-white/60 text-sm leading-6">A premium portrait of cinematic elegance, creative direction and storytelling that feels like a fashion magazine cover.</p>
              </div>
            </div>
            <div class="absolute -bottom-10 left-8 w-40 h-40 rounded-full border border-brand-gold/20 bg-brand-gold/10 blur-[50px]"></div>
          </div>
        </div>
      </div>
    </section>

    <app-ecosystem-expansion />

    <!-- FOUNDER SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute right-0 top-0 w-72 h-72 rounded-full bg-brand-pink/10 blur-[100px]"></div>
      <div class="relative max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div class="relative rounded-[36px] border border-brand-gold/10 bg-brand-dark/90 p-8 overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_30%)]"></div>
          <div class="aspect-[4/5] rounded-[32px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
          <div class="absolute bottom-8 left-8 rounded-[28px] border border-brand-white/10 bg-brand-black/70 p-5 backdrop-blur-sm">
            <p class="text-brand-white/60 text-xs uppercase tracking-[0.32em] mb-2">Founder & Creative Director</p>
            <p class="text-brand-white font-playfair text-xl">Yashvi Bagga</p>
            <p class="text-brand-gold text-xs mt-2">Signature Creative Vision</p>
          </div>
        </div>

        <div class="space-y-8">
          <div class="flex flex-col gap-4">
            <span class="text-brand-gold text-sm uppercase tracking-[0.3em]">About The Founder</span>
            <h2 class="heading-lg text-brand-white max-w-xl">An editorial storyteller shaping luxurious creator campaigns and cinematic brand narratives.</h2>
            <p class="body-lg text-brand-white/70 max-w-2xl">Yashvi Bagga is a passionate content creator, digital storyteller, and creative entrepreneur. From bold fashion campaigns to high-impact social launches, every project is crafted with editorial precision, emotional storytelling, and premium visual identity.</p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            @for (value of founderValues; track value.title) {
              <div class="glass-card p-6 border border-brand-white/10">
                <p class="text-brand-gold uppercase text-[11px] tracking-[0.3em] mb-4">{{ value.title }}</p>
                <p class="text-brand-white/70 text-sm leading-6">{{ value.description }}</p>
              </div>
            }
          </div>

          <div class="rounded-[28px] border border-brand-gold/15 bg-brand-black/70 p-8 backdrop-blur-sm">
            <p class="text-brand-white/90 font-playfair text-2xl mb-4">“We build influence with each story, making every brand feel like a cover story.”</p>
            <p class="text-brand-white/50 text-sm">A signature approach that combines luxury aesthetics, trend-led strategy and cinematic production values.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute left-0 bottom-10 w-72 h-72 rounded-full bg-brand-gold/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Service Excellence"
          title="Premium Services"
          description="A curated suite of luxury offerings for creators, brands and production teams."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          @for (service of premiumServices; track service.title) {
            <div class="group relative overflow-hidden rounded-[32px] border border-brand-white/10 bg-brand-dark/80 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,45,136,0.12),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div class="relative z-10 space-y-4">
                <div class="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-gold/10 text-brand-gold text-xl">
                  {{ service.icon }}
                </div>
                <h3 class="text-2xl font-playfair text-brand-white">{{ service.title }}</h3>
                <p class="text-brand-white/60 text-sm leading-6">{{ service.description }}</p>
                <div class="border-t border-brand-white/10 pt-4 text-brand-gold text-xs uppercase tracking-[0.24em]">Explore service</div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- INDUSTRIES WE SERVE (Module 6) -->
    <app-industries />

    <!-- CORE TEAM SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-brand-pink/10 blur-[100px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Meet The Team"
          title="The Creative Minds Behind The Magic"
          description="Departments and specialists delivering premium production, editorial direction and digital strategy."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-10">
          @for (team of coreTeam; track team.name) {
            <div class="group rounded-[32px] border border-brand-white/10 bg-brand-dark/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25">
              <div class="flex items-center gap-4">
                <div class="h-16 w-16 rounded-full bg-brand-white/5 border border-brand-white/10 flex items-center justify-center text-brand-gold text-xl font-semibold">{{ team.initials }}</div>
                <div>
                  <p class="text-brand-white font-semibold">{{ team.name }}</p>
                  <p class="text-brand-white/50 text-sm">{{ team.role }}</p>
                </div>
              </div>
              <p class="mt-4 text-brand-white/60 text-sm leading-6">{{ team.specialty }}</p>
              <div class="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.28em] text-brand-white/40">
                @for (tag of team.tags; track tag) {
                  <span class="rounded-full border border-brand-white/10 px-3 py-1">{{ tag }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- DIGITAL JOURNEY SECTION -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(212,175,55,0.09),_transparent_30%)]"></div>
      <div class="relative max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div class="space-y-8">
          <span class="text-brand-gold text-sm uppercase tracking-[0.3em]">Social Presence</span>
          <h2 class="heading-lg text-brand-white max-w-xl">A digital journey designed for creators, brands and high-impact growth.</h2>
          <p class="body-lg text-brand-white/70 max-w-2xl">From Instagram reels to branded content, our approach fuses editorial storytelling with measurable social momentum for premium campaigns.</p>

          <div class="grid gap-4 sm:grid-cols-2">
            @for (stat of socialStats; track stat.label) {
              <div class="glass-card border border-brand-white/10 p-6">
                <p class="text-4xl font-playfair text-brand-gold">{{ stat.value }}</p>
                <p class="text-brand-white/60 text-sm uppercase tracking-[0.28em] mt-2">{{ stat.label }}</p>
              </div>
            }
          </div>
        </div>

        <div class="relative rounded-[36px] border border-brand-white/10 bg-brand-black/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
          <div class="relative overflow-hidden rounded-[32px] border border-brand-white/10 bg-brand-dark/90 p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="h-2.5 w-24 rounded-full bg-brand-white/10"></div>
              <div class="flex gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-brand-red"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-brand-gold"></span>
              </div>
            </div>
            <div class="grid gap-4">
              @for (post of socialPosts; track post.title) {
                <div class="rounded-3xl border border-brand-white/10 bg-brand-black/70 p-4 transition-all duration-300 hover:border-brand-gold/25">
                  <div class="mb-3 h-40 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,45,136,0.2),_rgba(13,13,13,0.95))]"></div>
                  <h3 class="text-brand-white font-semibold">{{ post.title }}</h3>
                  <p class="text-brand-white/50 text-sm leading-6">{{ post.description }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute left-0 top-1/4 w-72 h-72 rounded-full bg-brand-gold/10 blur-[100px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Why Choose Us"
          title="Our Creative Manifesto"
          description="A premium agency approach built for fashion, media and creator brands."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-10">
          @for (point of manifestoPoints; track point.title) {
            <div class="glass-card p-8 border border-brand-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25">
              <div class="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-gold/10 text-brand-gold text-xl mb-5">{{ point.icon }}</div>
              <h3 class="text-xl font-playfair text-brand-white mb-3">{{ point.title }}</h3>
              <p class="text-brand-white/60 text-sm leading-6">{{ point.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- PORTFOLIO HIGHLIGHTS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-black via-transparent to-brand-black opacity-60"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Portfolio Highlights"
          title="Editorial Visual Stories"
          description="A luxury showcase of campaigns, reels and cinematic brand moments."
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mt-10">
          <div class="grid gap-6">
            @for (card of portfolioHighlights.slice(0,2); track card.title) {
              <div class="relative rounded-[32px] overflow-hidden border border-brand-white/10 bg-[linear-gradient(180deg,_rgba(212,175,55,0.08),_rgba(10,10,10,0.9))] p-6 group hover:-translate-y-2 transition-all duration-500">
                <div class="mb-4 h-64 rounded-[28px] bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
                <p class="text-brand-gold uppercase text-[11px] tracking-[0.32em] mb-3">{{ card.category }}</p>
                <h3 class="text-2xl font-playfair text-brand-white">{{ card.title }}</h3>
              </div>
            }
          </div>
          <div class="grid gap-6">
            @for (card of portfolioHighlights.slice(2); track card.title) {
              <div class="relative rounded-[32px] overflow-hidden border border-brand-white/10 bg-[linear-gradient(180deg,_rgba(255,45,136,0.08),_rgba(10,10,10,0.95))] p-6 group hover:-translate-y-2 transition-all duration-500">
                <div class="mb-4 h-72 rounded-[28px] bg-[url('https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
                <p class="text-brand-gold uppercase text-[11px] tracking-[0.32em] mb-3">{{ card.category }}</p>
                <h3 class="text-2xl font-playfair text-brand-white">{{ card.title }}</h3>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.1),_transparent_30%)]"></div>
      <div class="relative max-w-6xl mx-auto rounded-[40px] border border-brand-gold/15 bg-brand-dark/90 p-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <p class="text-brand-gold uppercase tracking-[0.35em] text-sm mb-4">Let’s Create Together</p>
        <h2 class="heading-lg text-brand-white mb-6">Let’s Create Something Extraordinary Together.</h2>
        <p class="body-lg text-brand-white/70 max-w-2xl mx-auto mb-10">Book a consultation with YASHVI BAGGA PRODUCTIONS and bring your next luxury campaign, creator story, or production project to life.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <app-magnetic-button>
            <a routerLink="/contact" class="inline-flex items-center gap-3 px-10 py-4 bg-brand-gold text-brand-black font-semibold rounded-full transition-all duration-500 hover:bg-brand-white">
              Contact Us
            </a>
          </app-magnetic-button>
          <app-magnetic-button>
            <a href="https://wa.me/" target="_blank" class="inline-flex items-center gap-3 px-10 py-4 border border-brand-white/20 text-brand-white font-medium rounded-full transition-all duration-500 hover:border-brand-gold hover:text-brand-gold">
              WhatsApp Consultation
            </a>
          </app-magnetic-button>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  heroFeatures = [
    { icon: '✨', title: 'Cinematic Overlays', description: 'Elegant visual details that create premium, editorial depth.' },
    { icon: '🎞️', title: 'Parallax Movement', description: 'Smooth layered motion that feels polished and modern.' },
    { icon: '🪞', title: 'Glassmorphism CTA', description: 'Luxury call-to-action panels with premium blur and glow.' },
    { icon: '📸', title: 'Instagram-Inspired UI', description: 'Creator culture visuals with bold social-first presentation.' },
  ];

  founderValues = [
    { title: 'Visionary Storytelling', description: 'Transforming brand narratives into cinematic editorial moments.' },
    { title: 'Premium Production', description: 'From concept to launch, every detail is crafted for camera-ready impact.' },
  ];

  premiumServices = [
    { icon: '📱', title: 'Social Media Management', description: 'Luxury content curation, audience growth and creator-led storytelling.' },
    { icon: '🎬', title: 'Content Creation', description: 'Fashion-forward videos, editorial shoots and campaign assets.' },
    { icon: '🤝', title: 'Influencer Marketing', description: 'Strategic collaborations with creators and premium brand talent.' },
    { icon: '🎥', title: 'Creative Production', description: 'Full-service production with cinematic direction and edit craft.' },
    { icon: '✨', title: 'Personal Branding', description: 'Signature creator identity design for lasting digital influence.' },
    { icon: '👥', title: 'Talent Management', description: 'Curated talent partnerships for brands and creators alike.' },
    { icon: '💻', title: 'IT Solutions & Services', description: 'Digital infrastructure and technology experiences for modern brands.' },
    { icon: '👔', title: 'Manpower Outsourcing', description: 'Creative staffing and operational support for growing teams.' },
    { icon: '🎓', title: 'Vocational Training', description: 'Curated learning experiences for creators, editors and marketers.' },
  ];

  coreTeam = [
    { initials: 'AM', name: 'Aryan Malik', role: 'Photographer', specialty: 'Lifestyle & Fashion Photography', tags: ['Photographers', 'Editorial'] },
    { initials: 'MS', name: 'Megha Sharma', role: 'Photographer', specialty: 'Product & Brand Imagery', tags: ['Photographers', 'Luxury'] },
    { initials: 'RV', name: 'Rohan Verma', role: 'Videographer', specialty: 'Cinematic Video Direction', tags: ['Videographers', 'Storytelling'] },
    { initials: 'PM', name: 'Pranjal Mishra', role: 'Videographer', specialty: 'Travel & Lifestyle Films', tags: ['Videographers', 'Motion'] },
    { initials: 'TG', name: 'Tanvi Gupta', role: 'Graphic Designer', specialty: 'Brand Identity & Visual Design', tags: ['Designers', 'Brand'] },
    { initials: 'RK', name: 'Riya Kapoor', role: 'Graphic Designer', specialty: 'Social Media Creative', tags: ['Designers', 'Social'] },
    { initials: 'SK', name: 'Simran Kaur', role: 'Content Writer', specialty: 'Brand Storytelling & Copy', tags: ['Writers', 'Strategy'] },
    { initials: 'AN', name: 'Anjali Dubey', role: 'Video Editor', specialty: 'Reels & Short-form Editing', tags: ['Editors', 'Motion'] },
  ];

  socialStats = [
    { value: '8.5M', label: 'Monthly Reach' },
    { value: '120K', label: 'Creator Followers' },
    { value: '98%', label: 'Engagement Rate' },
    { value: '75+', label: 'Brand Partnerships' },
  ];

  socialPosts = [
    { title: 'Campaign Teaser', description: 'A premium reel concept with high-gloss editorial styling.' },
    { title: 'Creator Drop', description: 'A scroll-stopping social story for influencer audiences.' },
    { title: 'Brand Launch', description: 'A cinematic content suite for luxury product reveal.' },
  ];

  manifestoPoints = [
    { icon: '🧠', title: 'Creative & Trend-Driven Approach', description: 'We shape campaigns around culture, luxury and lasting impact.' },
    { icon: '🔧', title: 'End-to-End Production Support', description: 'Strategy, shoot, edit and launch with seamless execution.' },
    { icon: '🤝', title: 'Strong Industry Network', description: 'Creators, brands and media partners aligned for every story.' },
    { icon: '👥', title: 'Youth-Centric Digital Strategy', description: 'Modern content for Gen Z, creators and aspirational audiences.' },
    { icon: '🎨', title: 'Premium Visual Storytelling', description: 'Editorial frames, fashion aesthetics and cinematic motion.' },
    { icon: '📈', title: 'Result-Oriented Campaigns', description: 'Every experience is built to drive engagement and growth.' },
  ];

  portfolioHighlights = [
    { title: 'Luxury Fashion Film', category: 'Campaign' },
    { title: 'Creator Lifestyle Series', category: 'Editorial' },
    { title: 'Brand Launch Visuals', category: 'Production' },
    { title: 'Social Growth Reel', category: 'Digital' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Home | YASHVI BAGGA PRODUCTIONS',
      description: 'Luxury creative media agency specializing in cinematic storytelling, influencer campaigns, and premium digital experiences.',
      url: 'https://yashvibagga.com',
    });
  }
}
