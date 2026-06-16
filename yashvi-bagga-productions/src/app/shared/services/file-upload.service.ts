import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  AllowedFileKind,
  DEFAULT_MAX_FILE_MB,
  DocumentUpload,
  FILE_EXT_BY_KIND,
  FILE_KIND_BY_MIME,
} from '../models/document-upload.model';

/**
 * MODULE 5 / 10 — File upload service.
 *
 * Provider-agnostic, SSR-safe upload layer used by the reusable
 * <app-file-upload> component. In dev (no backend), `mockMode` simulates an
 * upload with real progress ticks so the full UX is testable; in production it
 * streams the file to `${apiUrl}/uploads` using HttpClient progress events.
 *
 * The frontend never holds storage credentials — the backend issues the signed
 * URL / stores the asset and returns the final `url` + `id`.
 */
export interface UploadProgress {
  progress: number;
  status: DocumentUpload['status'];
  url?: string;
  id?: string;
  error?: string;
}

export interface FileValidationRules {
  /** Allowed kinds; defaults to the full set the platform supports. */
  accept?: AllowedFileKind[];
  /** Max size in megabytes. */
  maxSizeMb?: number;
}

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  /** Dev simulation reuses the OTP mock flag so one switch governs dev mode. */
  private readonly mockMode = environment.otp?.mockMode ?? !environment.production;

  /** Detect a file's kind from MIME first, then extension as a fallback. */
  detectKind(file: File): AllowedFileKind | 'unknown' {
    const byMime = FILE_KIND_BY_MIME[file.type];
    if (byMime) {
      return byMime;
    }
    const lower = file.name.toLowerCase();
    for (const kind of Object.keys(FILE_EXT_BY_KIND) as AllowedFileKind[]) {
      if (FILE_EXT_BY_KIND[kind].some((ext) => lower.endsWith(ext))) {
        return kind;
      }
    }
    return 'unknown';
  }

  /** Returns an error string if the file is invalid, or null if it passes. */
  validate(file: File, rules: FileValidationRules = {}): string | null {
    const maxMb = rules.maxSizeMb ?? DEFAULT_MAX_FILE_MB;
    const kind = this.detectKind(file);

    if (kind === 'unknown') {
      return 'Unsupported file type. Allowed: PDF, DOCX, JPG, PNG, ZIP, MP4.';
    }
    if (rules.accept && !rules.accept.includes(kind)) {
      return `This field accepts ${rules.accept.join(', ').toUpperCase()} only.`;
    }
    if (file.size > maxMb * 1024 * 1024) {
      return `File is too large. Maximum size is ${maxMb} MB.`;
    }
    return null;
  }

  /** Build the human-readable size label (e.g. "2.4 MB"). */
  humanSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /**
   * Upload a file, emitting progress updates. Always SSR-safe (no-op stream on
   * the server). The component subscribes and maps these into a DocumentUpload.
   */
  upload(file: File, purpose = 'attachment'): Observable<UploadProgress> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({ progress: 0, status: 'pending' as const });
    }
    return this.mockMode ? this.mockUpload(file) : this.realUpload(file, purpose);
  }

  // --- real upload (production) --------------------------------------------
  private realUpload(file: File, purpose: string): Observable<UploadProgress> {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('purpose', purpose);

    return this.http
      .post<{ id: string; url: string }>(`${environment.apiUrl}/uploads`, form, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event): UploadProgress => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress = event.total ? Math.round((event.loaded / event.total) * 100) : 0;
            return { progress, status: 'uploading' };
          }
          if (event.type === HttpEventType.Response) {
            return {
              progress: 100,
              status: 'uploaded',
              id: event.body?.id,
              url: event.body?.url,
            };
          }
          return { progress: 0, status: 'uploading' };
        }),
        catchError((err: HttpErrorResponse) =>
          of({ progress: 0, status: 'error' as const, error: err?.message || 'Upload failed' })
        )
      );
  }

  // --- dev simulation -------------------------------------------------------
  private mockUpload(file: File): Observable<UploadProgress> {
    // Emit 0 → 100 across ~1.2s, then a synthetic local object URL.
    let pct = 0;
    return timer(0, 120).pipe(
      map((): UploadProgress => {
        pct = Math.min(100, pct + 12);
        if (pct >= 100) {
          return {
            progress: 100,
            status: 'uploaded',
            id: `local-${file.name}-${file.size}`,
            url: this.tryObjectUrl(file),
          };
        }
        return { progress: pct, status: 'uploading' };
      }),
      // stop the timer once we've emitted the completed frame
      // (takeWhile keeps the completing value)
      takeWhileInclusive((p) => p.status !== 'uploaded')
    );
  }

  private tryObjectUrl(file: File): string | undefined {
    try {
      return URL.createObjectURL(file);
    } catch {
      return undefined;
    }
  }
}

/**
 * Like takeWhile(pred) but also emits the first value that fails the predicate
 * — so the final `uploaded` frame is delivered before completion.
 */
function takeWhileInclusive<T>(predicate: (value: T) => boolean) {
  return (source: Observable<T>): Observable<T> =>
    new Observable<T>((subscriber) => {
      const sub = source.subscribe({
        next(value) {
          subscriber.next(value);
          if (!predicate(value)) {
            subscriber.complete();
          }
        },
        error(err) {
          subscriber.error(err);
        },
        complete() {
          subscriber.complete();
        },
      });
      return () => sub.unsubscribe();
    });
}
