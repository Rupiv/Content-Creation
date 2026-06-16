import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

/**
 * Global toast renderer. Mount once at the app root. Styled with the brand
 * palette (glass cards, gold/pink accents) to match the premium design.
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed top-24 right-4 sm:right-6 z-[100] flex flex-col gap-3 w-[calc(100%-2rem)] sm:w-auto sm:max-w-sm pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="glass-card pointer-events-auto flex items-start gap-3 px-4 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] animate-slide-up"
          [class.border-brand-gold/30]="toast.type === 'success'"
          [class.border-brand-pink/40]="toast.type === 'error'"
          role="status"
        >
          <!-- Icon -->
          <div class="shrink-0 mt-0.5">
            @switch (toast.type) {
              @case ('success') {
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                </span>
              }
              @case ('error') {
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-pink/15 text-brand-pink">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                </span>
              }
              @case ('loading') {
                <span class="flex h-6 w-6 items-center justify-center text-brand-gold">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                </span>
              }
              @default {
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-white/10 text-brand-white/70">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
              }
            }
          </div>

          <p class="flex-1 text-brand-white/90 font-poppins text-sm leading-snug">{{ toast.message }}</p>

          @if (toast.type !== 'loading') {
            <button
              type="button"
              class="shrink-0 text-brand-white/40 hover:text-brand-white transition-colors"
              (click)="toastService.dismiss(toast.id)"
              aria-label="Dismiss notification"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`:host { display: contents; }`],
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
