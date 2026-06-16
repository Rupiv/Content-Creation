/**
 * MODULE 5 / 9 — DocumentUpload model.
 *
 * Describes a single uploaded asset across every form. The public file-upload
 * component produces these objects; a backend persists them and fills in the
 * `url`/`id` once stored. Designed so the same record works for resumes,
 * portfolios, headshots, reels and ZIP bundles.
 */

/** File categories accepted by the File Upload Center. */
export type AllowedFileKind = 'pdf' | 'docx' | 'jpg' | 'png' | 'zip' | 'mp4';

/** Upload lifecycle for the progress UI. */
export type UploadStatus = 'pending' | 'uploading' | 'uploaded' | 'error';

export interface DocumentUpload {
  /** Stable id assigned by the backend once stored (client uses a temp id). */
  id?: string;
  /** Original file name. */
  name: string;
  /** MIME type as reported by the browser. */
  mimeType: string;
  /** Detected file kind (used for validation + preview). */
  kind: AllowedFileKind | 'unknown';
  /** Size in bytes. */
  size: number;
  /** Public/CDN URL once uploaded (empty until the backend returns it). */
  url?: string;
  /** Upload state for the progress bar. */
  status: UploadStatus;
  /** 0–100 upload progress. */
  progress: number;
  /** Error message when `status === 'error'`. */
  error?: string;
  /** What this upload represents on the form (resume, portfolio, reel…). */
  purpose?: string;
}

/** MIME ↔ kind mapping used by the upload component and service. */
export const FILE_KIND_BY_MIME: Record<string, AllowedFileKind> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'docx',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'application/zip': 'zip',
  'application/x-zip-compressed': 'zip',
  'video/mp4': 'mp4',
};

/** Friendly extension list per kind (fallback when MIME is missing). */
export const FILE_EXT_BY_KIND: Record<AllowedFileKind, string[]> = {
  pdf: ['.pdf'],
  docx: ['.doc', '.docx'],
  jpg: ['.jpg', '.jpeg'],
  png: ['.png'],
  zip: ['.zip'],
  mp4: ['.mp4'],
};

export const DEFAULT_MAX_FILE_MB = 10;
