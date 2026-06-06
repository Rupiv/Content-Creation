import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  private readonly defaultData: SeoData = {
    title: 'Yashvi Bagga Productions | Premium Creative Media & Digital Production Agency',
    description: 'A luxury creative media, influencer marketing, branding and digital production agency helping brands, creators and businesses grow through powerful storytelling and cinematic content production.',
    keywords: 'creative agency, influencer marketing, content creation, brand promotions, digital production, social media management',
    image: 'https://yashvibagga.com/assets/images/og-image.jpg',
    url: 'https://yashvibagga.com',
    type: 'website',
  };

  init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCanonicalUrl();
    });
  }

  updateMetaTags(data: Partial<SeoData>): void {
    const seoData = { ...this.defaultData, ...data };

    this.title.setTitle(seoData.title);

    this.meta.updateTag({ name: 'description', content: seoData.description });
    if (seoData.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seoData.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    if (seoData.url) {
      this.meta.updateTag({ property: 'og:url', content: seoData.url });
    }
    if (seoData.image) {
      this.meta.updateTag({ property: 'og:image', content: seoData.image });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });
    if (seoData.image) {
      this.meta.updateTag({ name: 'twitter:image', content: seoData.image });
    }
  }

  private updateCanonicalUrl(): void {
    const url = `https://yashvibagga.com${this.router.url}`;
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
