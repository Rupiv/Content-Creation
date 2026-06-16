import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      [class.nav-scrolled]="scrollService.isScrolled()"
      [class.nav-hidden]="isNavHidden()"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 lg:h-24">
          <!-- Logo -->
          <a routerLink="/" class="relative z-50 flex items-center gap-3 group" (click)="closeMenu()">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-yellow-300 flex items-center justify-center">
              <span class="text-brand-black font-playfair font-bold text-lg">Y</span>
            </div>
            <div class="hidden sm:block">
              <span class="text-brand-white font-playfair text-lg font-semibold tracking-wide group-hover:text-brand-gold transition-colors duration-300">
                YASHVI BAGGA
              </span>
              <span class="block text-[10px] uppercase tracking-[3px] text-brand-gold/80 font-poppins">
                Productions
              </span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8">
            @for (link of navLinks; track link.path) {
              <!-- Services Dropdown with Mega Menu -->
              @if (link.path === '/services') {
                <div class="relative group">
                  <button
                    class="text-sm font-poppins font-light text-brand-white/80 hover:text-brand-gold transition-all duration-300 relative flex items-center gap-2"
                  >
                    {{ link.label }}
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                  </button>

                  <!-- Mega Menu Dropdown -->
                  <div class="absolute left-0 mt-0 w-max opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-4 pointer-events-none group-hover:pointer-events-auto">
                    <div class="bg-brand-dark/95 backdrop-blur-xl border border-brand-gold/20 rounded-[28px] shadow-2xl p-8">
                      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 min-w-[1120px]">
                        <div class="space-y-4">
                          <h3 class="text-sm font-playfair text-brand-gold font-semibold uppercase tracking-wide">Services Overview</h3>
                          <p class="text-xs leading-6 text-brand-white/55">
                            A connected ecosystem for creative media, talent, technology and workforce growth.
                          </p>
                          <div class="space-y-2">
                            <a routerLink="/services" class="block text-xs text-brand-white/70 hover:text-brand-gold transition-colors duration-300">View All Services</a>
                            <a routerLink="/join-network" class="block text-xs text-brand-white/70 hover:text-brand-gold transition-colors duration-300">Join Network</a>
                            <a routerLink="/contact" class="block text-xs text-brand-white/70 hover:text-brand-gold transition-colors duration-300">Get Started</a>
                          </div>
                        </div>

                        <div class="space-y-4">
                          <h3 class="text-sm font-playfair text-brand-gold font-semibold uppercase tracking-wide">Creative Media</h3>
                          <ul class="space-y-2">
                            <li><a routerLink="/services/creative-media" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Creative Media & Production</a></li>
                            <li><a routerLink="/services/creative-media" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Content Creation</a></li>
                            <li><a routerLink="/services/creative-media" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Video Production</a></li>
                            <li><a routerLink="/services/creative-media" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Social Media Strategy</a></li>
                          </ul>
                        </div>

                        <div class="space-y-4">
                          <h3 class="text-sm font-playfair text-brand-gold font-semibold uppercase tracking-wide">Casting & Talent</h3>
                          <ul class="space-y-2">
                            <li><a routerLink="/casting-services" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Casting Services</a></li>
                            <li><a routerLink="/casting-application" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Casting Application</a></li>
                            <li><a routerLink="/talent-network" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Talent Network</a></li>
                            <li><a routerLink="/join-network" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Register as Talent</a></li>
                            <li><a routerLink="/media-professional" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Media Professional</a></li>
                            <li><a routerLink="/collaborations" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Apply for Collaborations</a></li>
                          </ul>
                        </div>

                        <div class="space-y-4">
                          <h3 class="text-sm font-playfair text-brand-gold font-semibold uppercase tracking-wide">Technology</h3>
                          <ul class="space-y-2">
                            <li><a routerLink="/it-solutions" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Technology & Digital Solutions</a></li>
                            <li><a routerLink="/services/it-solutions" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Web & App Development</a></li>
                            <li><a routerLink="/services/it-solutions" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">CRM & ERP Platforms</a></li>
                            <li><a routerLink="/services/it-solutions" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Cloud & Support</a></li>
                          </ul>
                        </div>

                        <div class="space-y-4">
                          <h3 class="text-sm font-playfair text-brand-gold font-semibold uppercase tracking-wide">Workforce & Growth</h3>
                          <ul class="space-y-2">
                            <li><a routerLink="/workforce-solutions" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Workforce Solutions</a></li>
                            <li><a routerLink="/services/manpower-outsourcing" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Staffing Services</a></li>
                            <li><a routerLink="/manpower-requirement" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Manpower Requirement</a></li>
                            <li><a routerLink="/vocational-training" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Vocational Training</a></li>
                            <li><a routerLink="/join-network" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Career Portal</a></li>
                            <li><a routerLink="/our-process" class="text-xs text-brand-white/70 hover:text-brand-white transition-colors duration-300">Our Process</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } @else {
                <a
                  [routerLink]="link.path"
                  routerLinkActive="text-brand-gold"
                  [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                  class="text-sm font-poppins font-light text-brand-white/80 hover:text-brand-gold transition-all duration-300 relative group"
                >
                  {{ link.label }}
                  <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              }
            }
            <a
              routerLink="/contact"
              class="ml-4 px-6 py-2.5 bg-brand-gold text-brand-black font-poppins font-medium text-sm rounded-full hover:bg-brand-pink hover:text-white transition-all duration-300 hover:scale-105"
            >
              Let's Create
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            (click)="toggleMenu()"
            [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'"
          >
            <div class="flex flex-col gap-1.5 w-6">
              <span
                class="w-full h-[2px] bg-brand-white transition-all duration-300"
                [class.rotate-45]="mobileMenuOpen()"
                [class.translate-y-2]="mobileMenuOpen()"
              ></span>
              <span
                class="w-full h-[2px] bg-brand-gold transition-all duration-300"
                [class.opacity-0]="mobileMenuOpen()"
              ></span>
              <span
                class="w-full h-[2px] bg-brand-white transition-all duration-300"
                [class.-rotate-45]="mobileMenuOpen()"
                [class.-translate-y-2]="mobileMenuOpen()"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        class="fixed inset-0 bg-brand-black/98 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center overflow-y-auto transition-all duration-500"
        [class.opacity-100]="mobileMenuOpen()"
        [class.pointer-events-auto]="mobileMenuOpen()"
        [class.opacity-0]="!mobileMenuOpen()"
        [class.pointer-events-none]="!mobileMenuOpen()"
      >
        <div class="flex flex-col items-center gap-8 py-12">
          @for (link of navLinks; track link.path; let i = $index) {
            @if (link.path === '/services') {
              <div class="w-full flex flex-col items-center gap-4">
                <button
                  class="text-2xl font-playfair text-brand-white hover:text-brand-gold transition-all duration-300 flex items-center gap-2"
                  (click)="toggleMobileServices()"
                >
                  {{ link.label }}
                  <svg class="w-5 h-5 transition-transform duration-300" [class.rotate-180]="mobileServicesOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </button>
                
                <!-- Mobile Services Submenu -->
                @if (mobileServicesOpen()) {
                  <div class="w-full pt-4 border-t border-brand-gold/20 space-y-6">
                    <div class="text-center">
                      <a routerLink="/services" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">View All Services</a>
                    </div>

                    <div class="space-y-3">
                      <p class="text-[11px] uppercase tracking-[0.3em] text-brand-gold/80 text-center">Creative Media</p>
                      <div class="flex flex-col items-center gap-3">
                        <a routerLink="/services/creative-media" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Creative Media & Production</a>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <p class="text-[11px] uppercase tracking-[0.3em] text-brand-gold/80 text-center">Casting & Talent</p>
                      <div class="flex flex-col items-center gap-3">
                        <a routerLink="/casting-services" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Casting Services</a>
                        <a routerLink="/casting-application" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Casting Application</a>
                        <a routerLink="/talent-network" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Talent Network</a>
                        <a routerLink="/join-network" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Join Network</a>
                        <a routerLink="/media-professional" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Media Professional</a>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <p class="text-[11px] uppercase tracking-[0.3em] text-brand-gold/80 text-center">Technology</p>
                      <div class="flex flex-col items-center gap-3">
                        <a routerLink="/it-solutions" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Technology & Digital Solutions</a>
                        <a routerLink="/services/it-solutions" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Web & App Development</a>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <p class="text-[11px] uppercase tracking-[0.3em] text-brand-gold/80 text-center">Workforce & Growth</p>
                      <div class="flex flex-col items-center gap-3">
                        <a routerLink="/workforce-solutions" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Workforce Solutions</a>
                        <a routerLink="/manpower-requirement" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Manpower Requirement</a>
                        <a routerLink="/vocational-training" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Vocational Training</a>
                        <a routerLink="/our-process" class="text-sm text-brand-white/70 hover:text-brand-gold transition-colors" (click)="closeMenu()">Our Process</a>
                      </div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-brand-gold"
                class="text-2xl font-playfair text-brand-white hover:text-brand-gold transition-all duration-300"
                [style.transition-delay]="(i * 80) + 'ms'"
                (click)="closeMenu()"
              >
                {{ link.label }}
              </a>
            }
          }
          <a
            routerLink="/contact"
            class="mt-6 px-8 py-3 bg-brand-gold text-brand-black font-poppins font-semibold rounded-full hover:bg-brand-pink hover:text-white transition-all duration-300"
            (click)="closeMenu()"
          >
            Let's Create
          </a>

          <!-- Social Links Mobile -->
          <div class="flex gap-6 mt-8">
            <a href="https://instagram.com" target="_blank" rel="noopener" class="text-brand-white/60 hover:text-brand-gold transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" class="text-brand-white/60 hover:text-brand-gold transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-brand-white/60 hover:text-brand-gold transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }

    .nav-scrolled {
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    }

    .nav-hidden {
      transform: translateY(-100%);
    }
  `],
})
export class NavbarComponent {
  readonly scrollService = inject(ScrollService);
  private readonly platformId = inject(PLATFORM_ID);

  mobileMenuOpen = signal(false);
  mobileServicesOpen = signal(false);
  isNavHidden = signal(false);

  private lastScrollY = 0;

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/collaborations', label: 'Collaborations' },
    { path: '/testimonials', label: 'Testimonials' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const currentY = window.scrollY;
    if (currentY > 100 && currentY > this.lastScrollY) {
      this.isNavHidden.set(true);
    } else {
      this.isNavHidden.set(false);
    }
    this.lastScrollY = currentY;
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
    }
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileServicesOpen.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  toggleMobileServices(): void {
    this.mobileServicesOpen.update(v => !v);
  }
}
