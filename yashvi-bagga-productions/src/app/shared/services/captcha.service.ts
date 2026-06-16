import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

type GreCaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
  render: (el: HTMLElement, params: Record<string, unknown>) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
};

declare global {
  interface Window {
    grecaptcha?: GreCaptcha;
  }
}

const SCRIPT_ID = 'google-recaptcha-sdk';

/**
 * Loads the Google reCAPTCHA SDK on demand and exposes a thin, promise-based
 * API for both v3 (invisible, score-based) and v2 (checkbox) flows.
 *
 * - SSR-safe: every browser API is guarded with `isPlatformBrowser`.
 * - The SDK script is injected at most once and shared across all forms.
 * - All failures resolve gracefully (never throw) so a captcha outage cannot
 *   hard-crash a form.
 */
@Injectable({ providedIn: 'root' })
export class CaptchaService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** Resolved active config (read-only snapshot of the environment). */
  readonly config = environment.recaptcha;

  /** Becomes true once the SDK is ready to use. */
  readonly ready = signal(false);

  private loadPromise: Promise<boolean> | null = null;

  get version(): 'v2' | 'v3' {
    return this.config.version;
  }

  get siteKey(): string {
    return this.version === 'v3' ? this.config.v3SiteKey : this.config.v2SiteKey;
  }

  /** True when captcha is switched on AND a site key is configured. */
  get isActive(): boolean {
    return this.config.enabled && !!this.siteKey;
  }

  /**
   * Lazily loads the reCAPTCHA SDK. Resolves to `true` when usable, `false`
   * on any failure (no key, SSR, network error). Safe to call repeatedly.
   */
  load(): Promise<boolean> {
    if (!this.isBrowser || !this.isActive) {
      return Promise.resolve(false);
    }
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise<boolean>((resolve) => {
      // Already present (e.g. injected by another component).
      if (window.grecaptcha?.execute) {
        this.ready.set(true);
        resolve(true);
        return;
      }

      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      const onLoad = () => {
        const grecaptcha = window.grecaptcha;
        if (!grecaptcha) {
          resolve(false);
          return;
        }
        grecaptcha.ready(() => {
          this.ready.set(true);
          resolve(true);
        });
      };

      if (existing) {
        existing.addEventListener('load', onLoad, { once: true });
        existing.addEventListener('error', () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      // v3 renders implicitly with the site key; v2 renders explicitly.
      script.src =
        this.version === 'v3'
          ? `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(this.siteKey)}`
          : 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', onLoad, { once: true });
      script.addEventListener('error', () => resolve(false), { once: true });
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  /**
   * Executes a v3 challenge and returns a fresh token for the given action.
   * Returns `null` if captcha is inactive or the challenge fails — callers
   * decide how to surface that.
   */
  async executeV3(action: string): Promise<string | null> {
    const loaded = await this.load();
    if (!loaded || !window.grecaptcha?.execute) {
      return null;
    }
    try {
      return await window.grecaptcha.execute(this.siteKey, { action });
    } catch {
      return null;
    }
  }

  /** Renders a v2 checkbox widget into `el`. Returns the widget id or null. */
  renderV2(
    el: HTMLElement,
    callbacks: { onVerified: (token: string) => void; onExpired: () => void; onError: () => void }
  ): number | null {
    if (!this.isBrowser || !window.grecaptcha?.render) {
      return null;
    }
    try {
      return window.grecaptcha.render(el, {
        sitekey: this.siteKey,
        theme: 'dark',
        callback: callbacks.onVerified,
        'expired-callback': callbacks.onExpired,
        'error-callback': callbacks.onError,
      });
    } catch {
      return null;
    }
  }

  resetV2(widgetId: number | null): void {
    if (this.isBrowser && widgetId !== null && window.grecaptcha?.reset) {
      try {
        window.grecaptcha.reset(widgetId);
      } catch {
        /* no-op */
      }
    }
  }
}
