import {
  Component,
  Input,
  forwardRef,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TaxonomyOption } from '../../models/taxonomy.model';

let uid = 0;

/**
 * Reusable tag/chip input (ControlValueAccessor → string[]).
 *
 * Powers skill tagging, software-expertise tagging and language selection
 * across the workflow modules. Add tags by typing + Enter/comma, or by clicking
 * a suggestion chip; remove with × or Backspace on an empty field.
 *
 *   <app-skill-tags formControlName="skills" label="Skills"
 *     [suggestions]="SOFTWARE_OPTIONS" placeholder="Add a skill…" />
 */
@Component({
  selector: 'app-skill-tags',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      @if (label) {
        <label [for]="id" class="block text-brand-white/60 font-poppins text-sm mb-2">
          {{ label }} @if (required) { <span aria-hidden="true">*</span> }
        </label>
      }

      <div
        class="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-brand-white/5 px-3 py-2 focus-within:border-brand-gold transition-colors"
      >
        @for (tag of tags(); track tag) {
          <span class="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
            {{ tag }}
            <button type="button" class="text-brand-gold/70 hover:text-brand-pink" (click)="removeTag(tag)" [attr.aria-label]="'Remove ' + tag">×</button>
          </span>
        }
        <input
          [id]="id"
          type="text"
          [value]="draft()"
          [attr.placeholder]="tags().length ? '' : placeholder"
          class="min-w-[8rem] flex-1 bg-transparent py-1 text-brand-white font-poppins text-sm placeholder:text-brand-white/30 focus:outline-none"
          (input)="onInput($any($event.target).value)"
          (keydown.enter)="commit($event)"
          (keydown.backspace)="onBackspace()"
          (blur)="commitPlain(); onTouched()"
        />
      </div>

      @if (suggestions.length) {
        <div class="mt-2 flex flex-wrap gap-2">
          @for (option of suggestions; track option.slug) {
            @if (!hasTag(option.label)) {
              <button
                type="button"
                class="rounded-full border border-brand-white/10 px-3 py-1 text-xs text-brand-white/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                (click)="addTag(option.label)"
              >+ {{ option.label }}</button>
            }
          }
        </div>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SkillTagsComponent), multi: true },
  ],
})
export class SkillTagsComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Type and press Enter…';
  @Input() required = false;
  @Input() maxTags = 25;
  @Input() suggestions: TaxonomyOption[] = [];

  readonly id = `skill-tags-${uid++}`;
  readonly tags = signal<string[]>([]);
  readonly draft = signal('');

  private onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  hasTag(value: string): boolean {
    return this.tags().some((t) => t.toLowerCase() === value.trim().toLowerCase());
  }

  onInput(value: string): void {
    // A typed comma acts as a separator and commits the current tag.
    if (value.includes(',')) {
      this.draft.set(value.replace(/,/g, ''));
      this.commitPlain();
      return;
    }
    this.draft.set(value);
  }

  commit(event: Event): void {
    event.preventDefault();
    this.commitPlain();
  }

  commitPlain(): void {
    const value = this.draft().trim().replace(/,$/, '').trim();
    if (value) {
      this.addTag(value);
    }
    this.draft.set('');
  }

  addTag(value: string): void {
    const clean = value.trim();
    if (!clean || this.hasTag(clean) || this.tags().length >= this.maxTags) {
      return;
    }
    this.tags.set([...this.tags(), clean]);
    this.draft.set('');
    this.onChange(this.tags());
  }

  removeTag(tag: string): void {
    this.tags.set(this.tags().filter((t) => t !== tag));
    this.onChange(this.tags());
  }

  onBackspace(): void {
    if (this.draft() === '' && this.tags().length) {
      this.removeTag(this.tags()[this.tags().length - 1]);
    }
  }

  // --- ControlValueAccessor ---
  writeValue(value: string[] | null): void {
    this.tags.set(Array.isArray(value) ? value : []);
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
