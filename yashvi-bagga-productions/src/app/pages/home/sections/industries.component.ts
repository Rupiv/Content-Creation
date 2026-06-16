import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { INDUSTRIES } from '../../../shared/models/taxonomy.model';

/**
 * MODULE 6 — "Industries We Serve".
 *
 * Additive home-page section. Renders the ten served industries from the shared
 * taxonomy using the existing brand card/section styling. Mounted in the home
 * template without altering any existing section.
 */
@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08),_transparent_30%)]"></div>
      <div class="absolute left-0 bottom-10 w-72 h-72 rounded-full bg-brand-pink/10 blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Industries We Serve"
          title="Trusted Across Sectors"
          description="From media and startups to government and healthcare, our creative, technology and workforce solutions adapt to every industry."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          @for (industry of industries; track industry.slug) {
            <div
              class="group rounded-[24px] border border-brand-white/10 bg-brand-black/70 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/25"
              appScrollAnimation
              animationType="fade-up"
            >
              <div class="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl text-brand-gold transition-transform duration-500 group-hover:scale-110">
                {{ industry.icon }}
              </div>
              <h3 class="text-brand-white font-playfair text-lg">{{ industry.label }}</h3>
              <p class="mt-2 text-brand-white/50 text-xs leading-5">{{ industry.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class IndustriesComponent {
  readonly industries = INDUSTRIES;
}
