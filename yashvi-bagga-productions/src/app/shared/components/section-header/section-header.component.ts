import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-16" [class]="containerClass">
      <span class="inline-block text-brand-gold font-poppins text-sm font-medium tracking-[3px] uppercase mb-4">
        {{ subtitle }}
      </span>
      <h2 class="heading-lg text-brand-white mb-6">
        <span [class]="titleGradient ? 'gradient-text' : ''">{{ title }}</span>
      </h2>
      @if (description) {
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto">
          {{ description }}
        </p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
  @Input() description = '';
  @Input() titleGradient = false;
  @Input() containerClass = '';
}
