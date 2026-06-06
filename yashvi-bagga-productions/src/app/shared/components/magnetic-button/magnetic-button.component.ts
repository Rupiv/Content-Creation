import { Component, ElementRef, inject, AfterViewInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-magnetic-button',
  standalone: true,
  template: `
    <div #magneticBtn class="magnetic-btn">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
  `],
})
export class MagneticButtonComponent implements AfterViewInit {
  @ViewChild('magneticBtn') magneticBtn!: ElementRef<HTMLElement>;

  private readonly animationService = inject(AnimationService);
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.magneticBtn) {
      this.animationService.magneticEffect(this.magneticBtn.nativeElement, 0.3);
    }
  }
}
