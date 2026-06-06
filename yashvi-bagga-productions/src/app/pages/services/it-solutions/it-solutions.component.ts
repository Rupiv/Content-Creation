import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { MagneticButtonComponent } from '../../../shared/components/magnetic-button/magnetic-button.component';
import { SeoService } from '../../../core/services/seo.service';
import gsap from 'gsap';

@Component({
  selector: 'app-it-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent, MagneticButtonComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-transparent to-brand-black"></div>

        <!-- Animated gradient glows -->
        <div class="absolute top-20 right-16 w-64 h-64 rounded-full bg-cyan-500/15 opacity-50 pointer-events-none" style="filter: blur(100px);"></div>
        <div class="absolute bottom-16 left-12 w-64 h-64 rounded-full bg-blue-400/10 opacity-45 pointer-events-none" style="filter: blur(90px);"></div>

        <!-- Tech grid pattern -->
        <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(0deg, transparent 24%, rgba(0, 200, 255, 0.08) 25%, rgba(0, 200, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 200, 255, 0.08) 75%, rgba(0, 200, 255, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 200, 255, 0.08) 25%, rgba(0, 200, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 200, 255, 0.08) 75%, rgba(0, 200, 255, 0.08) 76%, transparent 77%, transparent); background-size: 50px 50px;"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-cyan-400 font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Futuristic Technology</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          IT Solutions
          <span class="gradient-text-cyan">& Services</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Enterprise-grade technology solutions designed to transform your digital infrastructure, accelerate innovation, and drive sustainable growth in the digital landscape.
        </p>

        <!-- Animated CTA button -->
        <div class="mt-10 animate-slide-up" style="animation-delay: 0.6s;">
          <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-300 font-poppins font-medium rounded-lg hover:border-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-105">
            Get Started
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- CORE SERVICES GRID -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Core Offerings"
          title="Our IT Service Portfolio"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (service of coreServices; track service.title; let i = $index) {
            <div
              class="group relative"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Tech Card -->
              <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 group-hover:blur-lg"></div>
              
              <div class="relative bg-brand-dark/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full overflow-hidden group-hover:border-cyan-500/50 transition-all duration-500">
                <!-- Animated background -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-cyan-500 to-blue-500 transition-opacity duration-500"></div>

                <!-- Icon with glow -->
                <div class="relative z-10 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/30">
                  <span class="text-xl">{{ service.icon }}</span>
                </div>

                <!-- Content -->
                <h3 class="relative z-10 text-lg font-playfair text-brand-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {{ service.title }}
                </h3>
                <p class="relative z-10 text-brand-white/50 font-poppins text-sm leading-relaxed mb-4">
                  {{ service.description }}
                </p>

                <!-- Features list -->
                <ul class="relative z-10 space-y-2 mb-6">
                  @for (feature of service.features; track feature; let j = $index) {
                    @if (j < 3) {
                      <li class="flex items-center gap-2 text-cyan-300/70 font-poppins text-xs">
                        <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                        {{ feature }}
                      </li>
                    }
                  }
                </ul>

                <!-- CTA -->
                <a href="#" class="relative z-10 inline-flex items-center gap-2 text-cyan-400 font-poppins text-sm font-medium group-hover:gap-3 group-hover:text-cyan-300 transition-all duration-300">
                  Explore
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- SERVICE WORKFLOW -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Process"
          title="Service Delivery Workflow"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <!-- Timeline -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          @for (step of workflowSteps; track step.phase; let i = $index) {
            <div 
              class="relative"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Connecting line -->
              @if (i < workflowSteps.length - 1) {
                <div class="hidden lg:block absolute top-12 left-[calc(100%+1rem)] w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
              }

              <!-- Step card -->
              <div class="bg-brand-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full hover:border-cyan-500/50 transition-all duration-500 hover:bg-brand-black/70">
                <!-- Step number -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <span class="text-brand-white font-bold text-sm">{{ i + 1 }}</span>
                  </div>
                  <span class="text-cyan-400 font-poppins text-xs uppercase tracking-widest font-semibold">{{ step.phase }}</span>
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

    <!-- TECHNOLOGY STACK -->
    <section class="section-padding bg-brand-black relative">
      <div class="absolute inset-0">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Tech Stack"
          title="Technologies We Master"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          @for (category of techCategories; track category.name) {
            <div 
              appScrollAnimation
              animationType="fade-up"
              class="space-y-6"
            >
              <h3 class="text-xl font-playfair text-cyan-300 mb-6 flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm">{{ category.icon }}</span>
                {{ category.name }}
              </h3>

              <div class="grid grid-cols-2 gap-4">
                @for (tech of category.technologies; track tech; let i = $index) {
                  <div 
                    class="group relative overflow-hidden rounded-lg"
                    [style.transition-delay]="(i * 50) + 'ms'"
                  >
                    <!-- Glow background -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                    <!-- Content -->
                    <div class="relative bg-brand-dark/60 backdrop-blur-sm border border-cyan-500/20 px-4 py-3 rounded-lg text-center group-hover:border-cyan-500/50 transition-all duration-300">
                      <p class="text-brand-white/80 font-poppins text-sm group-hover:text-cyan-300 transition-colors duration-300">{{ tech }}</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- SUCCESS METRICS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @for (metric of metrics; track metric.label; let i = $index) {
            <div 
              class="text-center p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                {{ metric.value }}
              </div>
              <p class="text-brand-white/60 font-poppins text-sm">{{ metric.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-50"></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="heading-lg text-brand-white mb-6">Ready to Transform Your Business?</h2>
        <p class="body-lg text-brand-white/60 mb-8 max-w-2xl mx-auto">
          Let's discuss how our IT solutions can help you achieve your business goals and drive digital transformation.
        </p>
        <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-poppins font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
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
      background: linear-gradient(135deg, #00d4ff, #0088ff);
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
export class ItSolutionsComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  coreServices = [
    {
      title: 'Web Application Development',
      icon: '🌐',
      description: 'Modern, scalable web applications built with cutting-edge technologies and best practices.',
      features: ['Responsive Design', 'Progressive Web Apps', 'Cloud Native', 'API Development'],
    },
    {
      title: 'Mobile App Development',
      icon: '📱',
      description: 'Native and cross-platform mobile solutions for iOS and Android platforms.',
      features: ['Native Apps', 'Cross-Platform', 'Real-time Sync', 'Offline Support'],
    },
    {
      title: 'UI/UX Design',
      icon: '🎨',
      description: 'Stunning user interfaces and experiences that drive engagement and conversion.',
      features: ['User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    },
    {
      title: 'Cloud Solutions',
      icon: '☁️',
      description: 'Infrastructure as a Service, Platform as a Service, and Software as a Service solutions.',
      features: ['AWS Solutions', 'Azure Services', 'GCP Integration', 'Multi-cloud'],
    },
    {
      title: 'Software Consulting',
      icon: '💡',
      description: 'Strategic technology consulting to align solutions with your business objectives.',
      features: ['Architecture Design', 'Tech Stack Selection', 'Migration Planning', 'Optimization'],
    },
    {
      title: 'Digital Transformation',
      icon: '🚀',
      description: 'End-to-end digital transformation services to modernize your operations.',
      features: ['Process Automation', 'Legacy Modernization', 'Change Management', 'Training'],
    },
    {
      title: 'Enterprise Solutions',
      icon: '🏢',
      description: 'Comprehensive enterprise-grade solutions for large-scale operations.',
      features: ['ERP Systems', 'CRM Integration', 'Business Intelligence', 'Custom Solutions'],
    },
    {
      title: 'Maintenance & Support',
      icon: '🔧',
      description: '24/7 technical support and proactive maintenance for your systems.',
      features: ['24/7 Support', 'Monitoring', 'Patching', 'Performance Tuning'],
    },
  ];

  workflowSteps = [
    {
      phase: 'Discovery',
      title: 'Requirements Analysis',
      description: 'We analyze your needs, goals, and technical requirements to create a comprehensive roadmap.',
    },
    {
      phase: 'Planning',
      title: 'Solution Architecture',
      description: 'Our experts design scalable, secure, and efficient solutions tailored to your needs.',
    },
    {
      phase: 'Development',
      title: 'Implementation',
      description: 'Our skilled developers build your solution using agile methodologies and best practices.',
    },
    {
      phase: 'Deployment',
      title: 'Launch & Support',
      description: 'We ensure smooth deployment and provide comprehensive support for your new system.',
    },
  ];

  techCategories = [
    {
      name: 'Frontend',
      icon: '✨',
      technologies: ['React', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
    {
      name: 'Backend',
      icon: '⚙️',
      technologies: ['Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust'],
    },
    {
      name: 'Cloud & DevOps',
      icon: '☁️',
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    },
    {
      name: 'Databases',
      icon: '🗄️',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'Cassandra'],
    },
  ];

  metrics = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '200+', label: 'Tech Experts' },
    { value: '50M+', label: 'End Users Impacted' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'IT Solutions & Services | YASHVI BAGGA PRODUCTIONS',
      description: 'Enterprise-grade IT solutions including web development, mobile apps, cloud solutions, and digital transformation services.',
      url: 'https://yashvibagga.com/services/it-solutions',
    });
  }
}
