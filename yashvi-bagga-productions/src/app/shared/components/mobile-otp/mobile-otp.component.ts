import { Component, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OtpControlBase, OtpLabels } from '../otp-control.base';
import { MobileOtpService } from '../../services/mobile-otp.service';
import { OtpService } from '../../services/otp-base.service';

/**
 * Reusable Mobile OTP verification control. Delivery is provider-agnostic
 * (MSG91 / Twilio / Fast2SMS) via MobileOtpService. Identical behaviour to the
 * email control — only the service and copy differ.
 *
 *   <app-mobile-otp
 *     formControlName="mobileVerified"
 *     [destination]="form.value.phone"
 *     [destinationValid]="!!form.get('phone')?.valid" />
 */
@Component({
  selector: 'app-mobile-otp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      @if (verified()) {
        <div
          class="inline-flex items-center gap-2 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-2.5 text-brand-gold font-poppins text-sm animate-fade-in"
          role="status"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          {{ labels.verifiedLabel }}
        </div>
      } @else {
        @if (!sent()) {
          <button
            type="button"
            (click)="requestCode()"
            [disabled]="!destinationValid || busy()"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold/15 border border-brand-gold/40 text-brand-gold font-poppins text-sm font-medium rounded-xl hover:bg-brand-gold/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            @if (status() === 'sending') {
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
              {{ labels.sendingLabel }}
            } @else {
              {{ labels.sendLabel }}
            }
          </button>
        } @else {
          <div class="flex flex-col sm:flex-row gap-2 animate-fade-in">
            <input
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              [attr.maxlength]="codeLength"
              [attr.aria-label]="labels.inputLabel"
              (input)="onCodeInput($event)"
              [placeholder]="labels.inputLabel"
              class="flex-1 bg-brand-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-brand-white font-poppins text-sm tracking-[0.3em] focus:border-brand-gold focus:outline-none transition-colors"
            />
            <button
              type="button"
              (click)="verifyCode()"
              [disabled]="busy() || code.length !== codeLength"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-gold text-brand-black font-poppins text-sm font-semibold rounded-xl hover:bg-brand-pink hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              @if (status() === 'verifying') {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-90" fill="currentColor" d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/></svg>
                Verifying…
              } @else {
                Verify OTP
              }
            </button>
          </div>

          <button
            type="button"
            (click)="resend()"
            [disabled]="!canResend()"
            class="font-poppins text-xs text-brand-white/50 hover:text-brand-gold transition-colors disabled:hover:text-brand-white/50 disabled:cursor-not-allowed"
          >
            @if (resendRemaining() > 0) {
              Resend OTP in {{ resendRemaining() }}s
            } @else if (canResend()) {
              Resend OTP
            } @else {
              Resend limit reached
            }
          </button>
        }

        @if (errorMsg()) {
          <p class="font-poppins text-xs text-brand-pink animate-fade-in" role="alert">{{ errorMsg() }}</p>
        }
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MobileOtpComponent), multi: true },
  ],
})
export class MobileOtpComponent extends OtpControlBase {
  protected readonly service: OtpService = inject(MobileOtpService);
  protected readonly labels: OtpLabels = {
    sendLabel: 'Send OTP',
    sendingLabel: 'Sending OTP…',
    verifiedLabel: 'Mobile Number Verified',
    inputLabel: 'Enter mobile OTP',
    noun: 'mobile number',
  };
}
