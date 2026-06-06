import { Directive, ElementRef, inject, Input, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animationType: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'fade' = 'fade-up';
  @Input() animationDelay = 0;
  @Input() animationThreshold = 0.15;

  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;

    // Set initial state
    element.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${this.animationDelay}ms`;

    switch (this.animationType) {
      case 'fade-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px)';
        break;
      case 'fade-left':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-60px)';
        break;
      case 'fade-right':
        element.style.opacity = '0';
        element.style.transform = 'translateX(60px)';
        break;
      case 'scale':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.85)';
        break;
      case 'fade':
        element.style.opacity = '0';
        break;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1)';
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: this.animationThreshold }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
