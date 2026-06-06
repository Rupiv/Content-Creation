import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-brand-pink/8 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Our Story</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Crafting <span class="gradient-text">Digital</span> Excellence
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          We are more than an agency. We are storytellers, visionaries, and digital architects
          building the future of creative media.
        </p>
      </div>
    </section>

    <!-- AGENCY STORY -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Image placeholder -->
          <div class="relative" appScrollAnimation animationType="fade-left">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-brand-dark to-brand-pink/10"></div>
              <div class="absolute inset-4 border border-brand-gold/20 rounded-xl"></div>
              <div class="absolute bottom-8 left-8 right-8">
                <div class="glass-card p-4">
                  <p class="text-brand-gold font-playfair text-lg">Est. 2020</p>
                  <p class="text-brand-white/60 font-poppins text-sm">New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div appScrollAnimation animationType="fade-right">
            <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">The Beginning</span>
            <h2 class="heading-md text-brand-white mt-4 mb-6">
              Born From Passion, Driven By <span class="gradient-text">Vision</span>
            </h2>
            <div class="space-y-4 text-brand-white/60 font-poppins text-sm leading-relaxed">
              <p>
                Yashvi Bagga Productions was founded with a singular vision — to bridge the gap between
                brands and audiences through powerful, cinematic storytelling that resonates in the digital age.
              </p>
              <p>
                What started as a passion for content creation has evolved into a full-service creative agency
                that partners with leading brands, top-tier influencers, and ambitious businesses to create
                digital experiences that leave lasting impressions.
              </p>
              <p>
                Our approach combines luxury aesthetics with data-driven strategies, ensuring every campaign
                not only looks stunning but delivers measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOUNDER VISION -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>

      <div class="relative max-w-4xl mx-auto text-center" appScrollAnimation animationType="fade-up">
        <div class="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-pink/20 flex items-center justify-center border-2 border-brand-gold/20">
          <span class="text-brand-gold font-playfair text-3xl font-bold">YB</span>
        </div>
        <h3 class="heading-md text-brand-white mb-6">Founder's Vision</h3>
        <blockquote class="text-brand-white/70 font-playfair text-xl md:text-2xl italic leading-relaxed mb-6">
          "Every brand has a story worth telling. Our job is to tell it in a way that the world
          can't look away. We create influence, not just content."
        </blockquote>
        <p class="text-brand-gold font-poppins font-medium">Yashvi Bagga</p>
        <p class="text-brand-white/40 font-poppins text-sm">Founder & Creative Director</p>
      </div>
    </section>

    <!-- MISSION & PHILOSOPHY -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (item of philosophy; track item.title; let i = $index) {
            <div
              class="glass-card p-8 text-center hover:border-brand-gold/20 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <span class="text-3xl">{{ item.icon }}</span>
              </div>
              <h3 class="text-xl font-playfair text-brand-white mb-4">{{ item.title }}</h3>
              <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CREATIVE PROCESS TIMELINE -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="How We Work"
          title="Our Creative Process"
          description="A refined methodology that ensures exceptional results every time."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-gold/50 via-brand-pink/30 to-brand-gold/50"></div>

          @for (step of processSteps; track step.title; let i = $index) {
            <div
              class="relative flex flex-col lg:flex-row items-center gap-8 mb-16 last:mb-0"
              [class.lg:flex-row-reverse]="i % 2 !== 0"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Content -->
              <div class="lg:w-[45%] glass-card p-8">
                <span class="text-brand-gold font-poppins text-sm font-bold">0{{ i + 1 }}</span>
                <h4 class="text-xl font-playfair text-brand-white mt-2 mb-3">{{ step.title }}</h4>
                <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">{{ step.description }}</p>
              </div>

              <!-- Timeline dot -->
              <div class="hidden lg:flex w-10 h-10 rounded-full bg-brand-gold/20 border-2 border-brand-gold items-center justify-center z-10">
                <div class="w-3 h-3 rounded-full bg-brand-gold"></div>
              </div>

              <!-- Spacer -->
              <div class="hidden lg:block lg:w-[45%]"></div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- TEAM SECTION -->
    <section class="section-padding bg-brand-black relative">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="The Team"
          title="Creative Minds"
          description="A talented team of creators, strategists, and visionaries."
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          @for (member of team; track member.name; let i = $index) {
            <div
              class="group text-center"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <div class="absolute inset-0 bg-gradient-to-br" [style.background]="member.gradient"></div>
                <div class="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/0 transition-all duration-500"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p class="text-brand-white/80 font-poppins text-xs">{{ member.bio }}</p>
                </div>
              </div>
              <h4 class="text-brand-white font-playfair font-medium group-hover:text-brand-gold transition-colors">{{ member.name }}</h4>
              <p class="text-brand-white/40 font-poppins text-xs mt-1">{{ member.role }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  philosophy = [
    { icon: '🎯', title: 'Our Mission', description: 'To empower brands and creators with premium content and strategic influence that drives real growth in the digital space.' },
    { icon: '💫', title: 'Our Vision', description: 'To become India\'s most sought-after creative production agency, setting new standards in digital storytelling and brand building.' },
    { icon: '✨', title: 'Our Philosophy', description: 'Every pixel matters. Every frame tells a story. We believe in creating content that not only looks premium but converts and inspires.' },
  ];

  processSteps = [
    { title: 'Discovery & Strategy', description: 'We dive deep into understanding your brand, audience, and goals. Research-backed strategy forms the foundation of every campaign.' },
    { title: 'Creative Conceptualization', description: 'Our creative team brainstorms concepts that align with your brand DNA while pushing creative boundaries.' },
    { title: 'Production & Creation', description: 'From cinematic shoots to digital content creation, we bring concepts to life with premium production quality.' },
    { title: 'Launch & Amplify', description: 'Strategic distribution across platforms, influencer collaborations, and paid amplification to maximize reach and impact.' },
    { title: 'Analyze & Optimize', description: 'Data-driven analysis of campaign performance with continuous optimization for even better results.' },
  ];

  team = [
    { name: 'Yashvi Bagga', role: 'Founder & Creative Director', bio: 'Visionary leader with 5+ years in digital media.', gradient: 'linear-gradient(135deg, #D4AF37 0%, #1A1A1A 100%)' },
    { name: 'Arjun Mehta', role: 'Head of Production', bio: 'Award-winning filmmaker and content strategist.', gradient: 'linear-gradient(135deg, #FF2E88 0%, #1A1A1A 100%)' },
    { name: 'Neha Kapoor', role: 'Creative Strategist', bio: 'Brand storytelling expert with a fashion background.', gradient: 'linear-gradient(135deg, #1A1A1A 0%, #D4AF37 100%)' },
    { name: 'Rohan Singh', role: 'Digital Marketing Lead', bio: 'Growth hacker driving millions in digital reach.', gradient: 'linear-gradient(135deg, #D4AF37 0%, #FF2E88 100%)' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'About Us | Yashvi Bagga Productions',
      description: 'Learn about our story, mission, creative process, and the talented team behind Yashvi Bagga Productions.',
    });
  }
}
