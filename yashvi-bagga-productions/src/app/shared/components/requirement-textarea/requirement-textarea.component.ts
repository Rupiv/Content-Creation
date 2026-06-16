import { Component, Input, computed, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

let uniqueId = 0;

/**
 * "Describe Your Requirement" textarea with a live character counter and
 * built-in min/max validation.
 *
 * - ControlValueAccessor + Validator: drop into any Reactive Form with
 *   `<app-requirement-textarea formControlName="requirement" />`. Min/max
 *   errors are produced by the component itself, so the parent only needs to
 *   add `Validators.required` when the field is mandatory.
 * - Accessible: label is associated, counter is exposed via aria-describedby,
 *   and aria-invalid reflects validity.
 * - Styled to match the existing brand textareas (no layout changes elsewhere).
 */
@Component({
  selector: 'app-requirement-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <label [for]="id" class="block text-brand-white/60 font-poppins text-sm mb-2">
        {{ label }} @if (required) { <span aria-hidden="true">*</span> }
      </label>

      <textarea
        [id]="id"
        [rows]="rows"
        [value]="value()"
        [attr.minlength]="min"
        [attr.maxlength]="max"
        [attr.placeholder]="placeholder"
        [attr.aria-describedby]="id + '-counter'"
        [attr.aria-invalid]="touched() && !!error()"
        (input)="onInput($event)"
        (blur)="onBlur()"
        class="w-full bg-brand-white/5 border rounded-xl px-4 py-3 text-brand-white font-poppins text-sm focus:outline-none transition-colors resize-none"
        [class.border-white/10]="!(touched() && error())"
        [class.focus:border-brand-gold]="!(touched() && error())"
        [class.border-brand-pink/60]="touched() && error()"
      ></textarea>

      <div class="mt-1.5 flex items-center justify-between gap-3">
        <p class="font-poppins text-xs min-h-[1rem]" [class.text-brand-pink]="touched() && error()">
          @if (touched() && error() === 'min') {
            Please enter at least {{ min }} characters.
          } @else if (touched() && error() === 'max') {
            Please keep it under {{ max }} characters.
          } @else if (touched() && error() === 'required') {
            This field is required.
          }
        </p>
        <p
          [id]="id + '-counter'"
          class="font-poppins text-xs tabular-nums shrink-0"
          [class.text-brand-white/40]="!overLimit()"
          [class.text-brand-pink]="overLimit()"
          aria-live="polite"
        >
          {{ value().length }} / {{ max }} characters
        </p>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RequirementTextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RequirementTextareaComponent),
      multi: true,
    },
  ],
})
export class RequirementTextareaComponent implements ControlValueAccessor, Validator {
  @Input() label = 'Describe Your Requirement';
  @Input() min = 20;
  @Input() max = 2000;
  @Input() rows = 5;
  @Input() required = true;
  @Input() placeholder =
    'Please describe your project, business requirement, staffing requirement, training requirement, website requirement, or collaboration details.';

  readonly id = `requirement-${uniqueId++}`;
  readonly value = signal<string>('');
  readonly touched = signal(false);
  readonly overLimit = computed(() => this.value().length > this.max);

  /** Current validation error key, or null. */
  readonly error = computed<'required' | 'min' | 'max' | null>(() => {
    const len = this.value().trim().length;
    if (this.required && len === 0) {
      return 'required';
    }
    if (len > 0 && len < this.min) {
      return 'min';
    }
    if (this.value().length > this.max) {
      return 'max';
    }
    return null;
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private revalidate: () => void = () => {};

  onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
    this.value.set(next);
    this.onChange(next);
    this.revalidate();
  }

  onBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }

  // --- ControlValueAccessor ---
  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // --- Validator ---
  validate(_control: AbstractControl): ValidationErrors | null {
    const err = this.error();
    if (!err) {
      return null;
    }
    if (err === 'required') {
      return { required: true };
    }
    if (err === 'min') {
      return { minlength: { requiredLength: this.min, actualLength: this.value().trim().length } };
    }
    return { maxlength: { requiredLength: this.max, actualLength: this.value().length } };
  }
  registerOnValidatorChange(fn: () => void): void {
    this.revalidate = fn;
  }
}
