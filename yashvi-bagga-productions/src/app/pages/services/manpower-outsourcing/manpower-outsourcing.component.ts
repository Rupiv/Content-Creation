import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-manpower-outsourcing',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <!-- Animated gradient orbs -->
        <div class="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-teal-500/15 to-emerald-500/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s"></div>
        
        <!-- Professional grid pattern -->
        <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.1) 25%, rgba(16, 185, 129, 0.1) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1) 76%, transparent 77%, transparent); background-size: 50px 50px;"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-emerald-400 font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Corporate Excellence</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Workforce <span class="gradient-text" style="background: linear-gradient(135deg, #10b981, #0ea4a4);">Solutions</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Strategic staffing solutions that connect your organization with top-tier talent. We simplify recruitment, reduce overhead, and ensure seamless workforce integration.
        </p>

        <!-- Animated CTA button -->
        <div class="mt-10 animate-slide-up" style="animation-delay: 0.6s;">
          <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/50 text-emerald-300 font-poppins font-medium rounded-lg hover:border-emerald-300 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 hover:scale-105">
            Start Hiring
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- STAFFING SOLUTIONS -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Solutions"
          title="Comprehensive Staffing Services"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (solution of staffingSolutions; track solution.title; let i = $index) {
            <div
              class="group relative"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Card background -->
              <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
              
              <div class="relative bg-brand-dark/80 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 h-full overflow-hidden group-hover:border-emerald-500/50 transition-all duration-500">
                <!-- Animated background -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-emerald-500 to-teal-500 transition-opacity duration-500"></div>

                <!-- Icon -->
                <div class="relative z-10 w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/30">
                  <span class="text-xl">{{ solution.icon }}</span>
                </div>

                <!-- Content -->
                <h3 class="relative z-10 text-lg font-playfair text-brand-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {{ solution.title }}
                </h3>
                <p class="relative z-10 text-brand-white/50 font-poppins text-sm leading-relaxed mb-4">
                  {{ solution.description }}
                </p>

                <!-- Features -->
                <ul class="relative z-10 space-y-2 mb-6">
                  @for (feature of solution.benefits; track feature; let j = $index) {
                    @if (j < 3) {
                      <li class="flex items-center gap-2 text-emerald-300/70 font-poppins text-xs">
                        <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                        {{ feature }}
                      </li>
                    }
                  }
                </ul>

                <!-- CTA -->
                <a href="#" class="relative z-10 inline-flex items-center gap-2 text-emerald-400 font-poppins text-sm font-medium group-hover:gap-3 group-hover:text-emerald-300 transition-all duration-300">
                  Learn More
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- RECRUITMENT PROCESS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="How It Works"
          title="Our Recruitment Process"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <!-- Process Flow -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          @for (step of recruitmentProcess; track step.title; let i = $index) {
            <div 
              class="relative"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Connecting line -->
              @if (i < recruitmentProcess.length - 1) {
                <div class="hidden lg:block absolute top-12 left-[calc(100%+1rem)] w-6 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
              }

              <!-- Step card -->
              <div class="bg-brand-black/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 h-full hover:border-emerald-500/50 transition-all duration-500 hover:bg-brand-black/70">
                <!-- Step number -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <span class="text-brand-white font-bold text-sm">{{ i + 1 }}</span>
                  </div>
                </div>

                <!-- Content -->
                <h3 class="text-lg font-playfair text-brand-white mb-2">{{ step.title }}</h3>
                <p class="text-brand-white/60 font-poppins text-sm leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- INDUSTRY EXPERTISE -->
    <section class="section-padding bg-brand-black relative">
      <div class="absolute inset-0">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Expertise"
          title="Industries We Serve"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          @for (industry of industries; track industry.name; let i = $index) {
            <div
              class="group bg-brand-dark/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/50 hover:bg-brand-dark/70 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Icon -->
              <div class="text-4xl mb-4">{{ industry.icon }}</div>

              <!-- Industry name -->
              <h3 class="text-xl font-playfair text-emerald-300 mb-3">{{ industry.name }}</h3>

              <!-- Expertise areas -->
              <ul class="space-y-2">
                @for (area of industry.expertiseAreas; track area; let j = $index) {
                  @if (j < 4) {
                    <li class="flex items-center gap-2 text-brand-white/60 font-poppins text-sm">
                      <svg class="w-3 h-3 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      {{ area }}
                    </li>
                  }
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- STATISTICS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @for (stat of statistics; track stat.label; let i = $index) {
            <div 
              class="text-center p-6 rounded-xl border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                {{ stat.value }}
              </div>
              <p class="text-brand-white/60 font-poppins text-sm">{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- BENEFITS SECTION -->
    <section class="section-padding bg-brand-black relative">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Why Partner With Us"
          title="Your Success, Our Priority"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          @for (benefit of keyBenefits; track benefit.title; let i = $index) {
            <div
              class="flex gap-6"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Icon -->
              <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-2xl">
                {{ benefit.icon }}
              </div>

              <!-- Content -->
              <div>
                <h3 class="text-lg font-playfair text-brand-white mb-2">{{ benefit.title }}</h3>
                <p class="text-brand-white/60 font-poppins text-sm leading-relaxed">{{ benefit.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 opacity-50"></div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="heading-lg text-brand-white mb-6">Build Your Dream Team Today</h2>
        <p class="body-lg text-brand-white/60 mb-8 max-w-2xl mx-auto">
          Connect with qualified professionals who are ready to drive your business success.
        </p>
        <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-poppins font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
          Schedule Consultation
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .gradient-text {
      background: linear-gradient(135deg, #10b981, #0ea4a4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.6s ease-out;
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out;
    }
  `],
})
export class ManpowerOutsourcingComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly router = inject(Router);

  staffingSolutions = [
    {
      title: 'Technical Staffing',
      icon: '💻',
      description: 'Expert software engineers, developers, and IT professionals for your technical needs.',
      benefits: ['Quick Onboarding', 'Vetted Professionals', 'Long-term Partnerships'],
    },
    {
      title: 'Non-Technical Staffing',
      icon: '👥',
      description: 'Qualified professionals for HR, finance, operations, and administrative roles.',
      benefits: ['Diverse Talent Pool', 'Role Flexibility', 'Seamless Integration'],
    },
    {
      title: 'Contract Hiring',
      icon: '📋',
      description: 'Short-term and project-based staffing solutions with full accountability.',
      benefits: ['Flexible Duration', 'Cost Effective', 'Project Focused'],
    },
    {
      title: 'Permanent Hiring',
      icon: '🏆',
      description: 'Full-time talent acquisition with comprehensive recruitment and onboarding support.',
      benefits: ['Long-term Stability', 'Dedicated Support', 'Cultural Fit'],
    },
    {
      title: 'Remote Workforce',
      icon: '🌍',
      description: 'Globally distributed teams for remote work arrangements and hybrid models.',
      benefits: ['Global Reach', '24/7 Coverage', 'Cost Optimization'],
    },
    {
      title: 'Executive Recruitment',
      icon: '👔',
      description: 'C-suite and senior management placements for strategic leadership roles.',
      benefits: ['Leadership Expertise', 'Confidentiality', 'Cultural Alignment'],
    },
    {
      title: 'Corporate Recruitment',
      icon: '🏢',
      description: 'Bulk hiring solutions for corporate expansion and organizational growth.',
      benefits: ['Scalable Solutions', 'Quick Turnaround', 'Quality Assurance'],
    },
    {
      title: 'HR Support Services',
      icon: '📊',
      description: 'Complete HR management, compliance, and employee relations support.',
      benefits: ['HR Expertise', 'Compliance Focus', 'Employee Wellbeing'],
    },
  ];

  recruitmentProcess = [
    {
      title: 'Requirement Analysis',
      description: 'We understand your specific needs, culture, and skill requirements in detail.',
    },
    {
      title: 'Talent Search',
      description: 'Our team identifies and recruits qualified candidates from our extensive network.',
    },
    {
      title: 'Screening & Interview',
      description: 'Rigorous assessment and interviews to ensure the best fit for your organization.',
    },
    {
      title: 'Onboarding',
      description: 'Smooth transition and comprehensive onboarding support for seamless integration.',
    },
    {
      title: 'Support & Feedback',
      description: 'Ongoing support and feedback to ensure long-term success and satisfaction.',
    },
  ];

  industries = [
    {
      name: 'Information Technology',
      icon: '💻',
      expertiseAreas: ['Software Development', 'Cloud Infrastructure', 'Data Analytics', 'Cybersecurity'],
    },
    {
      name: 'Finance & Banking',
      icon: '💰',
      expertiseAreas: ['Risk Management', 'Compliance', 'Investment Banking', 'Financial Analysis'],
    },
    {
      name: 'Healthcare',
      icon: '🏥',
      expertiseAreas: ['Medical Professionals', 'Administration', 'Research', 'Patient Care'],
    },
    {
      name: 'Manufacturing',
      icon: '🏭',
      expertiseAreas: ['Operations', 'Quality Control', 'Supply Chain', 'Maintenance'],
    },
    {
      name: 'Retail & E-commerce',
      icon: '🛍️',
      expertiseAreas: ['Sales', 'Customer Service', 'Logistics', 'Marketing'],
    },
    {
      name: 'Hospitality',
      icon: '🏨',
      expertiseAreas: ['Management', 'Hospitality Staff', 'Event Planning', 'Customer Relations'],
    },
  ];

  statistics = [
    { value: '10K+', label: 'Placements Done' },
    { value: '500+', label: 'Corporate Clients' },
    { value: '95%', label: 'Retention Rate' },
    { value: '50+', label: 'Industries Served' },
  ];

  ngOnInit(): void {
    const currentPath = this.router.url.split('?')[0];
    const pageUrl = currentPath.startsWith('/services/')
      ? 'https://yashvibagga.com/services/manpower-outsourcing'
      : 'https://yashvibagga.com/workforce-solutions';

    this.seoService.updateMetaTags({
      title: 'Workforce & Outsourcing Solutions | YASHVI BAGGA PRODUCTIONS',
      description: 'Professional staffing and workforce outsourcing solutions including technical, non-technical, contract, and permanent hiring support.',
      url: pageUrl,
    });
  }

  keyBenefits = [
    {
      icon: '⚡',
      title: 'Quick Turnaround',
      description: 'We fill positions rapidly without compromising on quality or cultural fit.',
    },
    {
      icon: '💰',
      title: 'Cost Effective',
      description: 'Reduce hiring overhead and operational costs with our flexible staffing models.',
    },
    {
      icon: '✓',
      title: 'Quality Assurance',
      description: 'All candidates are thoroughly vetted and screened for competency and reliability.',
    },
    {
      icon: '🤝',
      title: 'Partnership Approach',
      description: 'We work as an extension of your team, invested in your long-term success.',
    },
    {
      icon: '🔄',
      title: 'Flexibility',
      description: 'Scale your workforce up or down based on your changing business needs.',
    },
    {
      icon: '📈',
      title: 'Growth Support',
      description: 'Strategic staffing solutions that align with your business growth objectives.',
    },
  ];

}
