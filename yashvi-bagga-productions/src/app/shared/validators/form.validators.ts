import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates an Indian mobile number.
 *
 * Accepts an optional +91 / 91 / 0 prefix and a 10-digit number that begins
 * with 6-9. The validator is "optional-friendly": an empty value passes so it
 * can be safely attached to fields that are not required. Combine with
 * `Validators.required` when the field is mandatory.
 */
export function indianMobileValidator(): ValidatorFn {
  const pattern = /^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || `${value}`.trim() === '') {
      return null;
    }
    const normalized = `${value}`.replace(/[\s-]/g, '');
    return pattern.test(normalized) ? null : { indianMobile: true };
  };
}

/** Extracts the bare 10-digit Indian mobile number, or null if not parseable. */
export function normalizeIndianMobile(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }
  const digits = `${value}`.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return digits;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return null;
}
