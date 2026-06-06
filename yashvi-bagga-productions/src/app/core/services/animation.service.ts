import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  revealOnScroll(elements: string | Element | Element[], options?: {
    y?: number;
    x?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    start?: string;
  }): void {
    if (!this.isBrowser) return;

    gsap.from(elements, {
      y: options?.y ?? 60,
      x: options?.x ?? 0,
      opacity: 0,
      duration: options?.duration ?? 1,
      stagger: options?.stagger ?? 0.2,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements as gsap.DOMTarget,
        start: options?.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  textReveal(element: string | Element, options?: {
    duration?: number;
    delay?: number;
  }): void {
    if (!this.isBrowser) return;

    gsap.from(element, {
      y: 100,
      opacity: 0,
      duration: options?.duration ?? 1.2,
      delay: options?.delay ?? 0,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }

  parallax(element: string | Element, speed: number = 0.5): void {
    if (!this.isBrowser) return;

    gsap.to(element, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  magneticEffect(element: HTMLElement, strength: number = 0.3): void {
    if (!this.isBrowser) return;

    const handleMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);
  }

  fadeIn(element: string | Element, delay: number = 0): void {
    if (!this.isBrowser) return;

    gsap.from(element, {
      opacity: 0,
      duration: 1,
      delay,
      ease: 'power2.out',
    });
  }

  staggerCards(container: string, cards: string, options?: {
    y?: number;
    stagger?: number;
  }): void {
    if (!this.isBrowser) return;

    gsap.from(cards, {
      y: options?.y ?? 80,
      opacity: 0,
      duration: 0.8,
      stagger: options?.stagger ?? 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  horizontalScroll(container: string, sections: string): void {
    if (!this.isBrowser) return;

    const scrollContainer = document.querySelector(container);
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    gsap.to(sections, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
      },
    });
  }

  killAll(): void {
    if (!this.isBrowser) return;
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  refresh(): void {
    if (!this.isBrowser) return;
    ScrollTrigger.refresh();
  }
}
