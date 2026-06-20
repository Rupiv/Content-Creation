import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black transition-all duration-700"
      [class.opacity-0]="!isLoading()"
      [class.pointer-events-none]="!isLoading()"
    >
      <div class="flex flex-col items-center gap-6">
        <!-- Animated Logo -->
        <div class="relative">
          <div class="w-20 h-20 rounded-full border-2 border-brand-gold/20 flex items-center justify-center">
            <div class="w-16 h-16 rounded-full border-2 border-t-brand-gold border-r-brand-gold border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <img src="/LogoYB.png" alt="Yashvi Bagga Productions logo" class="w-10 h-10 rounded-full object-cover" />
          </div>
        </div>

        <!-- Brand Text -->
        <div class="text-center">
          <p class="text-brand-gold font-playfair text-lg tracking-widest animate-pulse">
            YASHVI BAGGA
          </p>
          <p class="text-brand-white/40 font-poppins text-[10px] tracking-[4px] uppercase mt-1">
            Productions
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoadingComponent {
  isLoading = signal(true);

  hide(): void {
    this.isLoading.set(false);
  }
}
