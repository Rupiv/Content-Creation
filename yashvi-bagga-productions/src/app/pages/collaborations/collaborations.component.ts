import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-collaborations',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/4 left-1/2 w-96 h-96 bg-brand-pink/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Join Us</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          <span class="gradient-text">Collaborate</span> With Us
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Whether you're a brand seeking impact or a creator ready to grow — let's build something amazing together.
        </p>
      </div>
    </section>

    <!-- BRAND PARTNERSHIP -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div appScrollAnimation animationType="fade-left">
            <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">For Brands</span>
            <h2 class="heading-md text-brand-white mt-4 mb-6">
              Brand <span class="gradient-text">Partnerships</span>
            </h2>
            <p class="text-brand-white/60 font-poppins text-sm leading-relaxed mb-6">
              Partner with us to create campaigns that resonate. We work with brands across
              fashion, beauty, tech, lifestyle, and more to deliver measurable results through
              creative excellence.
            </p>
            <ul class="space-y-3 mb-8">
              @for (benefit of brandBenefits; track benefit) {
                <li class="flex items-center gap-3 text-brand-white/60 font-poppins text-sm">
                  <div class="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <svg class="w-3 h-3 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  </div>
                  {{ benefit }}
                </li>
              }
            </ul>
            <app-magnetic-button>
              <a routerLink="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500">
                Partner With Us
              </a>
            </app-magnetic-button>
          </div>

          <div class="relative" appScrollAnimation animationType="fade-right">
            <div class="aspect-square rounded-2xl overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-brand-dark to-brand-pink/10"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-6xl mb-4">🤝</div>
                  <p class="text-brand-gold font-playfair text-xl">200+ Brands</p>
                  <p class="text-brand-white/40 font-poppins text-sm">Trust Us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CREATOR ONBOARDING -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px]"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1 relative" appScrollAnimation animationType="fade-left">
            <div class="aspect-square rounded-2xl overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-pink/20 via-brand-dark to-brand-gold/10"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-6xl mb-4">⭐</div>
                  <p class="text-brand-pink font-playfair text-xl">100+ Creators</p>
                  <p class="text-brand-white/40 font-poppins text-sm">In Our Network</p>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2" appScrollAnimation animationType="fade-right">
            <span class="text-brand-pink font-poppins text-sm tracking-[3px] uppercase">For Creators</span>
            <h2 class="heading-md text-brand-white mt-4 mb-6">
              Creator <span class="gradient-text-pink">Onboarding</span>
            </h2>
            <p class="text-brand-white/60 font-poppins text-sm leading-relaxed mb-6">
              Join our exclusive network of creators and get access to premium brand deals,
              professional production support, and growth opportunities.
            </p>

            <!-- Creator Categories -->
            <div class="grid grid-cols-2 gap-3 mb-8">
              @for (category of creatorCategories; track category) {
                <div class="glass-card p-4 text-center hover:border-brand-pink/20 transition-all duration-300">
                  <span class="text-2xl block mb-2">{{ category.icon }}</span>
                  <span class="text-brand-white/60 font-poppins text-xs">{{ category.name }}</span>
                </div>
              }
            </div>

            <app-magnetic-button>
              <button
                class="inline-flex items-center gap-2 px-6 py-3 bg-brand-pink text-white font-poppins font-semibold rounded-full hover:bg-brand-gold hover:text-brand-black transition-all duration-500"
                (click)="showCreatorForm = true"
              >
                Join as Creator
              </button>
            </app-magnetic-button>
          </div>
        </div>
      </div>
    </section>

    <!-- TALENT COLLABORATION FORM -->
    <section class="section-padding bg-brand-black relative">
      <div class="relative max-w-3xl mx-auto">
        <app-section-header
          subtitle="Apply Now"
          title="Collaboration Form"
          description="Fill in your details and let's explore how we can work together."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <form [formGroup]="collabForm" (ngSubmit)="onSubmit()" class="glass-card p-8 md:p-12" appScrollAnimation animationType="fade-up">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Name -->
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Full Name *</label>
              <input
                formControlName="name"
                type="text"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Email *</label>
              <input
                formControlName="email"
                type="email"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <!-- Type -->
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">I am a *</label>
              <select
                formControlName="type"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
              >
                <option value="" disabled>Select type</option>
                <option value="brand">Brand / Business</option>
                <option value="creator">Content Creator</option>
                <option value="influencer">Influencer</option>
                <option value="talent">Talent / Model</option>
              </select>
            </div>

            <!-- Instagram -->
            <div>
              <label class="block text-brand-white/60 font-poppins text-sm mb-2">Instagram Handle</label>
              <input
                formControlName="instagram"
                type="text"
                class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors"
                placeholder="@yourhandle"
              />
            </div>
          </div>

          <!-- Message -->
          <div class="mb-8">
            <label class="block text-brand-white/60 font-poppins text-sm mb-2">Tell us about yourself *</label>
            <textarea
              formControlName="message"
              rows="4"
              class="w-full bg-brand-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:border-brand-gold focus:outline-none transition-colors resize-none"
              placeholder="Share your experience, niche, and what kind of collaboration you're interested in..."
            ></textarea>
          </div>

          <!-- Submit -->
          <div class="text-center">
            <button
              type="submit"
              [disabled]="collabForm.invalid"
              class="px-8 py-4 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class CollaborationsComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly fb = inject(FormBuilder);

  showCreatorForm = false;

  brandBenefits = [
    'Access to 100+ verified creators',
    'Cinematic content production',
    'End-to-end campaign management',
    'Performance tracking & analytics',
    'Dedicated brand strategist',
  ];

  creatorCategories = [
    { icon: '🎬', name: 'Content Creators' },
    { icon: '👗', name: 'Fashion & Beauty' },
    { icon: '🏋️', name: 'Fitness & Health' },
    { icon: '🍕', name: 'Food & Lifestyle' },
    { icon: '💻', name: 'Tech & Gaming' },
    { icon: '✈️', name: 'Travel & Adventure' },
  ];

  collabForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    type: ['', Validators.required],
    instagram: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  onSubmit(): void {
    if (this.collabForm.valid) {
      console.log('Form submitted:', this.collabForm.value);
      // Handle form submission
      alert('Thank you! We\'ll be in touch soon.');
      this.collabForm.reset();
    }
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Collaborations | Yashvi Bagga Productions',
      description: 'Partner with us as a brand or join our creator network. Explore collaboration opportunities with Yashvi Bagga Productions.',
    });
  }
}
