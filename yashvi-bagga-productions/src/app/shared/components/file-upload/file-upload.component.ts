import {
  Component,
  Input,
  forwardRef,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { ToastService } from '../../services/toast.service';
import { AllowedFileKind, DocumentUpload } from '../../models/document-upload.model';

let uid = 0;

/** Internal row pairing the persisted record with its in-memory File. */
interface UploadRow {
  doc: DocumentUpload;
  file: File;
  /** Object URL for image previews (revoked on remove). */
  previewUrl?: string;
}

/**
 * MODULE 5 — File Upload Center.
 *
 * Reusable drag-&-drop upload control (ControlValueAccessor). Supports
 * PDF · DOCX · JPG · PNG · ZIP · MP4 with preview, validation, per-file upload
 * progress and size limits. SSR-safe (delegates browser work to the service).
 *
 * Usage (single, e.g. resume):
 *   <app-file-upload formControlName="resume" label="Resume"
 *     [accept]="['pdf','docx']" [maxSizeMb]="5" />
 *
 * Usage (multiple, e.g. portfolio):
 *   <app-file-upload formControlName="portfolio" label="Portfolio"
 *     [multiple]="true" [accept]="['jpg','png','zip','mp4']" />
 *
 * Emits a single `DocumentUpload | null` when `multiple=false`, otherwise a
 * `DocumentUpload[]`.
 */
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      @if (label) {
        <label class="block text-brand-white/60 font-poppins text-sm mb-2">
          {{ label }} @if (required) { <span aria-hidden="true">*</span> }
        </label>
      }

      <!-- Drop zone -->
      <div
        role="button"
        tabindex="0"
        [attr.aria-label]="'Upload ' + (label || 'files')"
        class="relative rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors cursor-pointer focus:outline-none"
        [class.border-white/15]="!dragging()"
        [class.bg-brand-white/5]="!dragging()"
        [class.border-brand-gold]="dragging()"
        [class.bg-brand-gold/10]="dragging()"
        (click)="picker.click()"
        (keydown.enter)="picker.click()"
        (keydown.space)="picker.click(); $event.preventDefault()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <input
          #picker
          type="file"
          class="hidden"
          [accept]="acceptAttr()"
          [multiple]="multiple"
          (change)="onPick($event)"
        />
        <div class="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-2xl text-brand-gold">
          ⬆
        </div>
        <p class="text-brand-white font-poppins text-sm">
          <span class="text-brand-gold">Click to upload</span> or drag &amp; drop
        </p>
        <p class="mt-1 text-brand-white/45 font-poppins text-xs">
          {{ hint() }}
        </p>
      </div>

      <!-- File list -->
      @if (rows().length) {
        <ul class="mt-4 space-y-3">
          @for (row of rows(); track row.doc.name + row.doc.size) {
            <li class="rounded-2xl border border-brand-white/10 bg-brand-black/60 p-4">
              <div class="flex items-center gap-4">
                <!-- preview / icon -->
                <div class="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-brand-white/10 bg-brand-white/5 flex items-center justify-center">
                  @if (row.previewUrl) {
                    <img [src]="row.previewUrl" alt="" class="h-full w-full object-cover" />
                  } @else {
                    <span class="text-lg text-brand-gold">{{ kindIcon(row.doc.kind) }}</span>
                  }
                </div>

                <div class="min-w-0 flex-1">
                  <p class="truncate text-brand-white font-poppins text-sm">{{ row.doc.name }}</p>
                  <p class="text-brand-white/45 font-poppins text-xs">
                    {{ humanSize(row.doc.size) }} ·
                    <span
                      [class.text-brand-gold]="row.doc.status === 'uploading'"
                      [class.text-green-400]="row.doc.status === 'uploaded'"
                      [class.text-brand-pink]="row.doc.status === 'error'"
                    >{{ statusLabel(row.doc.status) }}</span>
                  </p>

                  @if (row.doc.status === 'uploading') {
                    <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-white/10">
                      <div class="h-full rounded-full bg-brand-gold transition-all duration-200" [style.width.%]="row.doc.progress"></div>
                    </div>
                  }
                  @if (row.doc.status === 'error' && row.doc.error) {
                    <p class="mt-1 text-brand-pink font-poppins text-xs">{{ row.doc.error }}</p>
                  }
                </div>

                <button
                  type="button"
                  class="shrink-0 h-9 w-9 rounded-full border border-brand-white/10 text-brand-white/60 transition-colors hover:border-brand-pink hover:text-brand-pink"
                  (click)="remove(row); $event.stopPropagation()"
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FileUploadComponent), multi: true },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  private readonly uploads = inject(FileUploadService);
  private readonly toast = inject(ToastService);

  @Input() label = '';
  @Input() multiple = false;
  @Input() required = false;
  @Input() maxSizeMb = 10;
  @Input() purpose = 'attachment';
  /** Allowed kinds; defaults to the full supported set. */
  @Input() accept: AllowedFileKind[] = ['pdf', 'docx', 'jpg', 'png', 'zip', 'mp4'];

  readonly id = `file-upload-${uid++}`;
  readonly rows = signal<UploadRow[]>([]);
  readonly dragging = signal(false);

  readonly acceptAttr = computed(() => this.accept.map((k) => '.' + (k === 'jpg' ? 'jpg,.jpeg' : k)).join(','));
  readonly hint = computed(
    () => `${this.accept.join(', ').toUpperCase()} · up to ${this.maxSizeMb} MB${this.multiple ? ' · multiple files' : ''}`,
  );

  private onChange: (value: DocumentUpload | DocumentUpload[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  // --- input handlers -------------------------------------------------------
  onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.ingest(Array.from(input.files));
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    if (event.dataTransfer?.files?.length) {
      this.ingest(Array.from(event.dataTransfer.files));
    }
  }

  // --- core -----------------------------------------------------------------
  private ingest(files: File[]): void {
    this.onTouched();
    const accepted: UploadRow[] = [];

    for (const file of files) {
      const error = this.uploads.validate(file, { accept: this.accept, maxSizeMb: this.maxSizeMb });
      if (error) {
        this.toast.error(`${file.name}: ${error}`);
        continue;
      }
      const kind = this.uploads.detectKind(file);
      const doc: DocumentUpload = {
        name: file.name,
        mimeType: file.type,
        kind,
        size: file.size,
        status: 'uploading',
        progress: 0,
        purpose: this.purpose,
      };
      const previewUrl = (kind === 'jpg' || kind === 'png') ? this.safeObjectUrl(file) : undefined;
      accepted.push({ doc, file, previewUrl });
    }

    if (!accepted.length) {
      return;
    }

    const next = this.multiple ? [...this.rows(), ...accepted] : accepted.slice(0, 1);
    // Single mode replaces the previous file — revoke its preview.
    if (!this.multiple) {
      this.rows().forEach((r) => this.revoke(r));
    }
    this.rows.set(next);
    this.emit();

    accepted.forEach((row) => this.startUpload(row));
  }

  private startUpload(row: UploadRow): void {
    this.uploads.upload(row.file, this.purpose).subscribe((p) => {
      this.patch(row, { status: p.status, progress: p.progress, url: p.url, id: p.id, error: p.error });
      if (p.status === 'uploaded') {
        this.emit();
      }
    });
  }

  remove(row: UploadRow): void {
    this.revoke(row);
    this.rows.set(this.rows().filter((r) => r !== row));
    this.emit();
  }

  private patch(row: UploadRow, partial: Partial<DocumentUpload>): void {
    this.rows.set(this.rows().map((r) => (r === row ? { ...r, doc: { ...r.doc, ...partial } } : r)));
  }

  private emit(): void {
    const docs = this.rows().map((r) => r.doc);
    this.onChange(this.multiple ? docs : (docs[0] ?? null));
  }

  // --- helpers --------------------------------------------------------------
  humanSize(bytes: number): string {
    return this.uploads.humanSize(bytes);
  }

  statusLabel(status: DocumentUpload['status']): string {
    switch (status) {
      case 'uploading': return 'Uploading…';
      case 'uploaded': return 'Uploaded';
      case 'error': return 'Failed';
      default: return 'Pending';
    }
  }

  kindIcon(kind: DocumentUpload['kind']): string {
    switch (kind) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'zip': return '🗜️';
      case 'mp4': return '🎬';
      case 'jpg':
      case 'png': return '🖼️';
      default: return '📎';
    }
  }

  private safeObjectUrl(file: File): string | undefined {
    try {
      return URL.createObjectURL(file);
    } catch {
      return undefined;
    }
  }

  private revoke(row: UploadRow): void {
    if (row.previewUrl) {
      try { URL.revokeObjectURL(row.previewUrl); } catch { /* noop */ }
    }
  }

  // --- ControlValueAccessor -------------------------------------------------
  writeValue(value: DocumentUpload | DocumentUpload[] | null): void {
    if (!value) {
      this.rows().forEach((r) => this.revoke(r));
      this.rows.set([]);
      return;
    }
    // Reset programmatic values are rare here; we only clear on null.
  }
  registerOnChange(fn: (value: DocumentUpload | DocumentUpload[] | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
