import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  /** Auto-dismiss delay in ms; 0 (or loading) means it stays until dismissed. */
  duration: number;
}

/**
 * Lightweight, signal-based toast/notification store. Rendered once by
 * <app-toast-container> mounted at the app root.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  private timers = new Map<number, ReturnType<typeof setTimeout>>();

  readonly toasts = signal<Toast[]>([]);

  success(message: string, duration = 4500): number {
    return this.show('success', message, duration);
  }

  error(message: string, duration = 6000): number {
    return this.show('error', message, duration);
  }

  info(message: string, duration = 4500): number {
    return this.show('info', message, duration);
  }

  /** Persistent "in progress" toast. Returns an id to update/dismiss later. */
  loading(message: string): number {
    return this.show('loading', message, 0);
  }

  /** Converts an existing toast (e.g. a loading one) into its final state. */
  update(id: number, type: ToastType, message: string, duration = 4500): void {
    this.toasts.update((list) =>
      list.map((t) => (t.id === id ? { ...t, type, message, duration } : t))
    );
    this.scheduleDismiss(id, duration);
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private show(type: ToastType, message: string, duration: number): number {
    const id = ++this.nextId;
    this.toasts.update((list) => [...list, { id, type, message, duration }]);
    this.scheduleDismiss(id, duration);
    return id;
  }

  private scheduleDismiss(id: number, duration: number): void {
    const existing = this.timers.get(id);
    if (existing) {
      clearTimeout(existing);
      this.timers.delete(id);
    }
    if (duration > 0) {
      // setTimeout is browser/Node-safe; toasts are only created from user
      // interactions, which never run during SSR.
      const timer = setTimeout(() => this.dismiss(id), duration);
      this.timers.set(id, timer);
    }
  }
}
