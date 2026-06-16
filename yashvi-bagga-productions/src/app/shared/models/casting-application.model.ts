/**
 * MODULE 2 / 9 — CastingApplication.
 *
 * Produced by the Casting Application System. Mirrors the on-page sections:
 * Personal Information, Physical Profile, Acting Experience, Skills, Media
 * Links, Portfolio Upload and Availability.
 */
import { ApplicationStatus, StatusEvent } from './application-status.model';
import { DocumentUpload } from './document-upload.model';

export interface PhysicalProfile {
  heightCm?: number | null;
  weightKg?: number | null;
  /** e.g. "Fair", "Wheatish", "Dusky". */
  complexion?: string;
  hairColor?: string;
  eyeColor?: string;
  /** Free text e.g. "32-28-34". */
  measurements?: string;
}

export interface CastingApplication {
  id?: string;

  // Section 1 — Personal Information
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;

  // Section 2 — Physical Profile
  physical: PhysicalProfile;

  // Section 3 — Acting Experience
  experienceLevel: string;
  yearsActive?: number | null;
  /** Notable projects, roles, theatre / ad / film credits. */
  credits?: string;
  /** Languages the performer can act in. */
  languages: string[];

  // Section 4 — Skills (dance, combat, accents, singing…)
  skills: string[];

  // Section 5 — Media Links
  mediaLinks: string[];

  // Section 6 — Portfolio Upload (headshots, reels, ZIP)
  portfolio?: DocumentUpload[];

  // Section 7 — Availability
  availability: string[];
  /** Willing to travel / relocate for shoots. */
  willingToTravel?: boolean;

  // --- workflow / admin fields ---
  status?: ApplicationStatus;
  history?: StatusEvent[];
  emailVerifiedToken?: string | null;
  mobileVerifiedToken?: string | null;
  createdAt?: string;
}
