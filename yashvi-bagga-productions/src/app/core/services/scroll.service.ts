import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  scrollY = signal(0);
  scrollDirection = signal<'up' | 'down'>('down');
  isScrolled = signal(false);

  private lastScrollY = 0;

  init(): void {
    if (!this.isBrowser) return;

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      this.scrollY.set(currentY);
      this.isScrolled.set(currentY > 50);
      this.scrollDirection.set(currentY > this.lastScrollY ? 'down' : 'up');
      this.lastScrollY = currentY;
    }, { passive: true });
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToElement(selector: string): void {
    if (!this.isBrowser) return;
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
