import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-gold/8 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Reviews</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Client <span class="gradient-text">Testimonials</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Don't just take our word for it. Hear what our clients and collaborators have to say.
        </p>
      </div>
    </section>

    <!-- FEATURED TESTIMONIALS -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (testimonial of testimonials; track testimonial.name; let i = $index) {
            <div
              class="glass-card p-8 hover:border-brand-gold/20 transition-all duration-500 hover:-translate-y-2 group"
              [class.lg:col-span-2]="i === 0"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 120"
            >
              <!-- Stars -->
              <div class="flex gap-1 mb-4">
                @for (_ of [1,2,3,4,5]; track _) {
                  <svg class="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                }
              </div>

              <!-- Quote -->
              <p class="text-brand-white/70 font-poppins leading-relaxed mb-6 italic"
                 [class.text-lg]="i === 0"
                 [class.text-sm]="i !== 0"
              >
                "{{ testimonial.quote }}"
              </p>

              <!-- Video placeholder -->
              @if (testimonial.hasVideo) {
                <div class="mb-6 relative rounded-xl overflow-hidden aspect-video group/video cursor-pointer">
                  <div class="absolute inset-0" [style.background]="testimonial.videoGradient"></div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-14 h-14 rounded-full bg-brand-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover/video:scale-110 transition-transform">
                      <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
              }

              <!-- Author -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                     [style.background]="'linear-gradient(135deg, ' + testimonial.avatarColor + '40, ' + testimonial.avatarColor + '10)'">
                  <span class="text-brand-white font-poppins font-bold">{{ testimonial.initials }}</span>
                </div>
                <div>
                  <p class="text-brand-white font-poppins font-medium text-sm">{{ testimonial.name }}</p>
                  <p class="text-brand-white/40 font-poppins text-xs">{{ testimonial.role }}</p>
                </div>
                @if (testimonial.company) {
                  <div class="ml-auto">
                    <span class="text-brand-gold/60 font-poppins text-xs">{{ testimonial.company }}</span>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- VIDEO TESTIMONIALS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Watch"
          title="Video Testimonials"
          description="See the real impact of our work through client stories."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (video of videoTestimonials; track video.name; let i = $index) {
            <div
              class="relative rounded-2xl overflow-hidden aspect-[9/16] group cursor-pointer"
              appScrollAnimation
              animationType="scale"
              [animationDelay]="i * 100"
            >
              <div class="absolute inset-0" [style.background]="video.gradient"></div>
              <div class="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/10 transition-all duration-500"></div>

              <!-- Play button -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-brand-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>

              <!-- Info -->
              <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-black/90 to-transparent">
                <p class="text-brand-white font-poppins font-medium text-sm">{{ video.name }}</p>
                <p class="text-brand-white/50 font-poppins text-xs">{{ video.role }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- BRANDS WE'VE WORKED WITH -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto text-center">
        <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-8 block" appScrollAnimation animationType="fade-up">
          Trusted By Leading Brands
        </span>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-40">
          @for (brand of brands; track brand; let i = $index) {
            <div
              class="text-center hover:opacity-100 transition-opacity duration-300"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 80"
            >
              <span class="text-brand-white font-playfair text-lg">{{ brand }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class TestimonialsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  testimonials = [
    {
      name: 'Priya Sharma',
      initials: 'PS',
      role: 'CEO & Founder',
      company: 'Luxe Beauty',
      quote: 'Yashvi Bagga Productions completely transformed our brand presence. The quality of content and strategic thinking behind every campaign was exceptional. Our social media engagement grew by 400% and we saw real business impact. This team truly understands modern digital branding.',
      avatarColor: '#D4AF37',
      hasVideo: true,
      videoGradient: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)',
    },
    {
      name: 'Rahul Verma',
      initials: 'RV',
      role: 'Founder',
      company: 'TechStart',
      quote: 'The most professional and creative team we\'ve worked with. They understood our vision instantly and delivered beyond our expectations.',
      avatarColor: '#FF2E88',
      hasVideo: false,
      videoGradient: '',
    },
    {
      name: 'Ananya Patel',
      initials: 'AP',
      role: 'Fashion Influencer',
      company: '2M Followers',
      quote: 'Working with YBP feels like creating art. Every collaboration is thoughtful, professional, and produces stunning results.',
      avatarColor: '#D4AF37',
      hasVideo: false,
      videoGradient: '',
    },
    {
      name: 'Vikram Singh',
      initials: 'VS',
      role: 'Marketing Director',
      company: 'FashionHub',
      quote: 'They don\'t just create content — they create impact. Our ROI on influencer campaigns has been incredible since partnering with them.',
      avatarColor: '#FF2E88',
      hasVideo: false,
      videoGradient: '',
    },
    {
      name: 'Meera Kapoor',
      initials: 'MK',
      role: 'Lifestyle Creator',
      company: '500K Followers',
      quote: 'The production quality is unmatched. They brought my vision to life with cinematic excellence that elevated my entire brand.',
      avatarColor: '#D4AF37',
      hasVideo: true,
      videoGradient: 'linear-gradient(135deg, #FF2E88 0%, #1A1A1A 100%)',
    },
    {
      name: 'Arjun Reddy',
      initials: 'AR',
      role: 'Brand Manager',
      company: 'NovaTech',
      quote: 'From strategy to execution, everything was seamless. They managed our entire digital presence and the results speak for themselves.',
      avatarColor: '#FF2E88',
      hasVideo: false,
      videoGradient: '',
    },
  ];

  videoTestimonials = [
    { name: 'Priya Sharma', role: 'CEO, Luxe Beauty', gradient: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)' },
    { name: 'Meera Kapoor', role: 'Lifestyle Creator', gradient: 'linear-gradient(135deg, #FF2E88 0%, #1A1A1A 100%)' },
    { name: 'Vikram Singh', role: 'Marketing Director', gradient: 'linear-gradient(135deg, #1A1A1A 0%, #D4AF37 100%)' },
  ];

  brands = ['LUXE', 'NOVA', 'STYLE', 'AURA', 'VIBE', 'ELITE'];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Testimonials | Yashvi Bagga Productions',
      description: 'Hear from our clients and collaborators. Real stories, real results from brands and creators who trust Yashvi Bagga Productions.',
    });
  }
}
