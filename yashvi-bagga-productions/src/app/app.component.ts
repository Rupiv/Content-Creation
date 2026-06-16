import { Component, OnInit, inject, PLATFORM_ID, AfterViewInit, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ToastContainerComponent } from './shared/components/toast/toast-container.component';
import { ScrollService } from './core/services/scroll.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    WhatsappButtonComponent,
    LoadingComponent,
    ToastContainerComponent,
  ],
  template: `
    <!-- Loading Screen -->
    @if (isLoading()) {
      <app-loading />
    }

    <!-- Main App -->
    <div [class.opacity-0]="isLoading()" class="transition-opacity duration-500">
      <app-navbar />

      <main>
        <router-outlet />
      </main>

      <app-footer />
      <app-whatsapp-button />
      <app-toast-container />

      <!-- Back to top button -->
      @if (scrollService.isScrolled()) {
        <button
          class="fixed bottom-6 left-6 z-50 w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 backdrop-blur-sm"
          (click)="scrollService.scrollToTop()"
          aria-label="Back to top"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `],
})
export class AppComponent implements OnInit, AfterViewInit {
  readonly scrollService = inject(ScrollService);
  private readonly seoService = inject(SeoService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  isLoading = signal(true);

  ngOnInit(): void {
    this.scrollService.init();
    this.seoService.init();

    // Scroll to top on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Simulate loading
      setTimeout(() => {
        this.isLoading.set(false);
      }, 2000);
    } else {
      this.isLoading.set(false);
    }
  }
}
