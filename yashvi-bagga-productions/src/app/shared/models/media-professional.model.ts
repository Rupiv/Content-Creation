/**
 * MODULE 3 / 9 — MediaProfessional.
 *
 * Produced by the Media Professional Registration system. Captures skills,
 * software expertise, work samples, portfolio links, compensation expectations
 * and the preferred engagement model.
 */
import { ApplicationStatus, StatusEvent } from './application-status.model';
import { DocumentUpload } from './document-upload.model';

export interface MediaProfessional {
  id?: string;

  fullName: string;
  email: string;
  mobile: string;
  location?: string;
  /** Primary role/title e.g. "Video Editor", "Motion Designer". */
  profession: string;
  experienceLevel: string;

  /** Free-form professional skills. */
  skills: string[];
  /** Software-expertise tags (SOFTWARE_OPTIONS slugs or free text). */
  software: string[];

  /** Links to reels, behance, dribbble, drive folders… */
  portfolioLinks: string[];
  /** Uploaded work samples (PDF/ZIP/MP4/images). */
  workSamples?: DocumentUpload[];

  /** Compensation expectation slug (COMPENSATION_RANGES) or free text. */
  compensationExpectation: string;
  /** Preferred engagement model slug (ENGAGEMENT_MODELS). */
  engagementModel: string;
  availability: string[];
  about?: string;

  // --- workflow / admin fields ---
  status?: ApplicationStatus;
  history?: StatusEvent[];
  emailVerifiedToken?: string | null;
  mobileVerifiedToken?: string | null;
  createdAt?: string;
}
