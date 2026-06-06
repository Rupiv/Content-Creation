import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-vocational-training',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollAnimationDirective, SectionHeaderComponent],
  template: `
    <!-- HERO SECTION -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <!-- Animated gradient orbs -->
        <div class="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-yellow-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-yellow-500/15 to-orange-500/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s"></div>
        
        <!-- Educational grid pattern -->
        <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(0deg, transparent 24%, rgba(245, 158, 11, 0.1) 25%, rgba(245, 158, 11, 0.1) 26%, transparent 27%, transparent 74%, rgba(245, 158, 11, 0.1) 75%, rgba(245, 158, 11, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(245, 158, 11, 0.1) 25%, rgba(245, 158, 11, 0.1) 26%, transparent 27%, transparent 74%, rgba(245, 158, 11, 0.1) 75%, rgba(245, 158, 11, 0.1) 76%, transparent 77%, transparent); background-size: 50px 50px;"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-yellow-400 font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Inspire Growth</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          Vocational <span class="gradient-text" style="background: linear-gradient(135deg, #f59e0b, #f97316);">Training Programs</span>
        </h1>
        <p class="body-lg text-brand-white/60 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Empower yourself with industry-relevant skills and professional certifications. Our comprehensive training programs are designed to launch successful careers in high-demand fields.
        </p>

        <!-- Animated CTA button -->
        <div class="mt-10 animate-slide-up" style="animation-delay: 0.6s;">
          <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 text-yellow-300 font-poppins font-medium rounded-lg hover:border-yellow-300 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 hover:scale-105">
            Enroll Now
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- TRAINING PROGRAMS -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Programs"
          title="Skill Development Courses"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (program of trainingPrograms; track program.title; let i = $index) {
            <div
              class="group relative overflow-hidden rounded-xl"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Glow background -->
              <div class="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
              
              <div class="relative bg-brand-dark/80 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 h-full overflow-hidden group-hover:border-yellow-500/50 transition-all duration-500">
                <!-- Animated background -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-yellow-500 to-orange-500 transition-opacity duration-500"></div>

                <!-- Icon -->
                <div class="relative z-10 w-14 h-14 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-yellow-500/30">
                  <span class="text-2xl">{{ program.icon }}</span>
                </div>

                <!-- Content -->
                <h3 class="relative z-10 text-xl font-playfair text-brand-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                  {{ program.title }}
                </h3>
                <p class="relative z-10 text-brand-white/50 font-poppins text-sm leading-relaxed mb-6">
                  {{ program.description }}
                </p>

                <!-- Program details -->
                <div class="relative z-10 space-y-3 mb-6">
                  <div class="flex items-center gap-2 text-brand-white/70 font-poppins text-sm">
                    <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{{ program.duration }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-brand-white/70 font-poppins text-sm">
                    <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                    <span>{{ program.level }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-brand-white/70 font-poppins text-sm">
                    <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{{ program.certification }}</span>
                  </div>
                </div>

                <!-- Topics -->
                <div class="relative z-10 mb-6 space-y-2">
                  @for (topic of program.topics; track topic) {
                    <div class="flex items-start gap-2">
                      <svg class="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      <span class="text-brand-white/60 font-poppins text-xs">{{ topic }}</span>
                    </div>
                  }
                </div>

                <!-- CTA -->
                <a routerLink="/contact" class="relative z-10 inline-flex items-center gap-2 text-yellow-400 font-poppins text-sm font-medium group-hover:gap-3 group-hover:text-yellow-300 transition-all duration-300">
                  Enroll Now
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- LEARNING JOURNEY -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-b from-yellow-500/10 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Your Path"
          title="Learning Journey"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <!-- Timeline -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          @for (phase of learningJourney; track phase.name; let i = $index) {
            <div 
              class="relative"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 150"
            >
              <!-- Connecting line -->
              @if (i < learningJourney.length - 1) {
                <div class="hidden lg:block absolute top-12 left-[calc(100%+1rem)] w-8 h-[2px] bg-gradient-to-r from-yellow-500 to-transparent"></div>
              }

              <!-- Phase card -->
              <div class="bg-brand-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 h-full hover:border-yellow-500/50 transition-all duration-500 hover:bg-brand-black/70">
                <!-- Phase number -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <span class="text-brand-white font-bold text-sm">{{ i + 1 }}</span>
                  </div>
                  <span class="text-yellow-400 font-poppins text-xs uppercase tracking-widest font-semibold">{{ phase.name }}</span>
                </div>

                <!-- Content -->
                <h3 class="text-lg font-playfair text-brand-white mb-2">{{ phase.title }}</h3>
                <p class="text-brand-white/60 font-poppins text-sm leading-relaxed">{{ phase.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- SUCCESS STORIES -->
    <section class="section-padding bg-brand-black relative">
      <div class="absolute inset-0">
        <div class="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Student Success"
          title="Career Transformation Stories"
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          @for (story of successStories; track story.name; let i = $index) {
            <div
              class="bg-brand-dark/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 hover:border-yellow-500/50 hover:bg-brand-dark/70 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <!-- Student avatar -->
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {{ story.initials }}
              </div>

              <!-- Quote -->
              <p class="text-brand-white/70 font-poppins text-sm italic mb-6 leading-relaxed">
                "{{ story.quote }}"
              </p>

              <!-- Student info -->
              <h3 class="text-lg font-playfair text-yellow-300 mb-1">{{ story.name }}</h3>
              <p class="text-brand-white/60 font-poppins text-sm mb-4">{{ story.previous }} → {{ story.current }}</p>

              <!-- Stats -->
              <div class="flex items-center gap-4 pt-4 border-t border-yellow-500/10">
                <div>
                  <p class="text-yellow-400 font-bold text-sm">{{ story.yearsExperience }}</p>
                  <p class="text-brand-white/50 text-xs">Years Experience</p>
                </div>
                <div class="flex-1">
                  <p class="text-yellow-400 font-bold text-sm">{{ story.salaryGrowth }}</p>
                  <p class="text-brand-white/50 text-xs">Salary Growth</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- STATISTICS -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          @for (stat of statistics; track stat.label; let i = $index) {
            <div 
              class="text-center p-6 rounded-xl border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                {{ stat.value }}
              </div>
              <p class="text-brand-white/60 font-poppins text-sm">{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- KEY BENEFITS -->
    <section class="section-padding bg-brand-black relative">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Why Choose Us"
          title="Educational Excellence"
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
              <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0 text-2xl">
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
      <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10 opacity-50"></div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="heading-lg text-brand-white mb-6">Start Your Career Journey Today</h2>
        <p class="body-lg text-brand-white/60 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers through our comprehensive training programs.
        </p>
        <a routerLink="/contact" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-poppins font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105">
          Enroll Today
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
      background: linear-gradient(135deg, #f59e0b, #f97316);
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
export class VocationalTrainingComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  trainingPrograms = [
    {
      icon: '💻',
      title: 'Full Stack Web Development',
      description: 'Master frontend and backend technologies to build complete web applications.',
      duration: '6 months',
      level: 'Beginner to Intermediate',
      certification: 'Industry Recognized',
      topics: ['HTML/CSS/JavaScript', 'React/Angular', 'Node.js/Express', 'Databases', 'APIs', 'Deployment'],
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Build native iOS and Android applications with modern development frameworks.',
      duration: '5 months',
      level: 'Intermediate',
      certification: 'Professional Certificate',
      topics: ['Swift/Kotlin', 'React Native', 'Mobile UI/UX', 'App Store Distribution', 'Performance', 'Testing'],
    },
    {
      icon: '🎨',
      title: 'Digital Marketing Mastery',
      description: 'Learn SEO, social media, content marketing, and digital advertising strategies.',
      duration: '3 months',
      level: 'Beginner',
      certification: 'Marketing Professional',
      topics: ['SEO/SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'Email Marketing', 'Branding'],
    },
    {
      icon: '📊',
      title: 'Data Analytics & BI',
      description: 'Transform data into actionable insights using modern analytics tools.',
      duration: '4 months',
      level: 'Intermediate',
      certification: 'Data Analytics Certification',
      topics: ['SQL', 'Python/R', 'Tableau/PowerBI', 'Statistical Analysis', 'Data Visualization', 'ML Basics'],
    },
    {
      icon: '🔐',
      title: 'Cybersecurity Essentials',
      description: 'Protect systems and networks from cyber threats with practical security knowledge.',
      duration: '4 months',
      level: 'Intermediate',
      certification: 'Security Professional',
      topics: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Incident Response', 'Compliance', 'Firewalls'],
    },
    {
      icon: '☁️',
      title: 'Cloud Architecture',
      description: 'Design and deploy scalable cloud solutions on AWS, Azure, and GCP platforms.',
      duration: '3 months',
      level: 'Advanced',
      certification: 'Cloud Architect',
      topics: ['AWS/Azure/GCP', 'Infrastructure', 'Containerization', 'Kubernetes', 'CI/CD', 'Monitoring'],
    },
    {
      icon: '🗣️',
      title: 'Professional Communication',
      description: 'Enhance presentation, writing, and interpersonal communication skills.',
      duration: '2 months',
      level: 'All Levels',
      certification: 'Communication Expert',
      topics: ['Public Speaking', 'Business Writing', 'Negotiation', 'Listening Skills', 'Networking', 'Leadership'],
    },
    {
      icon: '💼',
      title: 'Career Development Program',
      description: 'Interview preparation, resume building, and job search strategies.',
      duration: '1 month',
      level: 'All Levels',
      certification: 'Career Certified',
      topics: ['Resume Building', 'Interview Prep', 'Job Search', 'Salary Negotiation', 'LinkedIn Profile', 'Branding'],
    },
  ];

  learningJourney = [
    {
      name: 'Foundation',
      title: 'Build Your Base',
      description: 'Learn fundamental concepts and core principles of your chosen field.',
    },
    {
      name: 'Development',
      title: 'Skill Building',
      description: 'Develop practical skills through hands-on projects and real-world scenarios.',
    },
    {
      name: 'Advanced',
      title: 'Mastery',
      description: 'Master advanced concepts and industry best practices for expertise.',
    },
    {
      name: 'Certification',
      title: 'Achievement',
      description: 'Complete your course and earn industry-recognized certifications.',
    },
  ];

  successStories = [
    {
      initials: 'RJ',
      name: 'Raj Jain',
      quote: 'The training program completely transformed my career. I went from struggling with basic coding to building production-grade applications.',
      previous: 'Junior Support Executive',
      current: 'Senior Full Stack Developer',
      yearsExperience: '3+',
      salaryGrowth: '180%',
    },
    {
      initials: 'PS',
      name: 'Priya Singh',
      quote: 'The instructors were incredibly supportive and the curriculum was aligned with industry needs. I landed my dream job within a month of completion.',
      previous: 'Sales Representative',
      current: 'Digital Marketing Manager',
      yearsExperience: '2+',
      salaryGrowth: '150%',
    },
    {
      initials: 'AK',
      name: 'Arun Kumar',
      quote: 'This program gave me the confidence and skills I needed. The placement support was exceptional and the community is amazing.',
      previous: 'Freelance Developer',
      current: 'Cloud Architect',
      yearsExperience: '5+',
      salaryGrowth: '200%',
    },
  ];

  statistics = [
    { value: '5000+', label: 'Students Trained' },
    { value: '95%', label: 'Placement Rate' },
    { value: '50+', label: 'Courses Available' },
    { value: '500+', label: 'Hiring Partners' },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Vocational Training Programs | YASHVI BAGGA PRODUCTIONS',
      description: 'Comprehensive vocational and professional training programs in IT, digital marketing, soft skills, and career development.',
      url: 'https://yashvibagga.com/services/vocational-training',
    });
  }

  keyBenefits = [
    {
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience.',
    },
    {
      icon: '💼',
      title: 'Job Placement',
      description: 'Career support and direct placement assistance with top companies.',
    },
    {
      icon: '🏆',
      title: 'Certified Curriculum',
      description: 'Industry-recognized certifications that boost your professional credibility.',
    },
    {
      icon: '🤝',
      title: 'Community Support',
      description: 'Network with peers and mentors in an active learning community.',
    },
    {
      icon: '⏰',
      title: 'Flexible Learning',
      description: 'Online and offline classes designed to fit your schedule.',
    },
    {
      icon: '🚀',
      title: 'Career Growth',
      description: 'Continuously updated content aligned with market demands.',
    },
  ];
}
