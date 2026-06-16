/**
 * MODULE 1 / 9 — TalentProfile.
 *
 * The record produced by the Talent & Career Portal ("Join Our Network").
 * Admin-ready: a future Talent Management System consumes this shape directly.
 */
import { ApplicationStatus, StatusEvent } from './application-status.model';
import { DocumentUpload } from './document-upload.model';

export interface TalentProfile {
  id?: string;
  /** One of TALENT_CATEGORIES slugs. */
  category: string;
  fullName: string;
  email: string;
  mobile: string;
  /** City / base location. */
  location?: string;
  /** Experience level slug (EXPERIENCE_LEVELS). */
  experienceLevel: string;
  /** Free-form skill tags. */
  skills: string[];
  /** Availability preference slugs (AVAILABILITY_OPTIONS). */
  availability: string[];
  /** Portfolio / social links. */
  portfolioLinks: string[];
  resume?: DocumentUpload | null;
  /** Supporting work samples. */
  attachments?: DocumentUpload[];
  /** Applicant's own summary. */
  about?: string;

  // --- workflow / admin fields (future ATS) ---
  status?: ApplicationStatus;
  history?: StatusEvent[];
  /** Verified-contact proof tokens from the OTP layer. */
  emailVerifiedToken?: string | null;
  mobileVerifiedToken?: string | null;
  createdAt?: string;
}
