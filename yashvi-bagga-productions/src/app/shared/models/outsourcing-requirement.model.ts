/**
 * MODULE 4 / 9 — OutsourcingRequirement.
 *
 * Produced by the Manpower Requirement Portal (6-step wizard). One record per
 * client requirement; admin-ready for a future CRM / Lead Management pipeline.
 */
import { ApplicationStatus, StatusEvent } from './application-status.model';
import { DocumentUpload } from './document-upload.model';

/** A single role line-item within a workforce requirement. */
export interface WorkforceRole {
  /** Role title e.g. "Video Editor", "Telecaller", "Field Staff". */
  title: string;
  /** Number of people required for this role. */
  count: number;
  /** Required skills for the role. */
  skills?: string[];
  experienceLevel?: string;
}

export interface OutsourcingRequirement {
  id?: string;

  // Step 1 — Organization Information
  organizationName: string;
  industry: string;
  contactPerson: string;
  email: string;
  mobile: string;
  website?: string;
  /** Approximate company size. */
  companySize?: string;

  // Step 2 — Workforce Requirements
  roles: WorkforceRole[];
  /** Total headcount (derived but stored for quick filtering). */
  totalHeadcount?: number;

  // Step 3 — Deployment Details
  location?: string;
  /** 'onsite' | 'remote' | 'hybrid'. */
  workMode?: string;
  /** ISO date the workforce is needed by. */
  startDate?: string;
  /** Engagement duration e.g. "3 months", "Permanent". */
  duration?: string;

  // Step 4 — Compensation
  /** Per-role or overall budget range (COMPENSATION_RANGES) or free text. */
  budgetRange: string;
  /** Additional compensation notes (benefits, incentives). */
  compensationNotes?: string;

  // Step 5 — Verification (handled by OTP + captcha at submit)
  emailVerifiedToken?: string | null;
  mobileVerifiedToken?: string | null;

  // Step 6 — Submission
  /** Free-form description of the requirement. */
  requirement?: string;
  attachments?: DocumentUpload[];

  // --- workflow / admin fields ---
  status?: ApplicationStatus;
  history?: StatusEvent[];
  createdAt?: string;
}
