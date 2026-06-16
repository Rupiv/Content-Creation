/**
 * MODULE 8 — Application Status Architecture
 *
 * A single, future-ready status vocabulary shared by every applicant-facing
 * workflow (talent, casting, media professionals, manpower). Building this as
 * one canonical model means a future Applicant Tracking System / Admin
 * Dashboard can read and mutate the same statuses the public site produces —
 * no migration required.
 *
 * Nothing here renders by itself; pages opt-in by reading STATUS_META and the
 * per-track FLOWS below.
 */

/** The full lifecycle vocabulary. A given track uses a subset (see FLOWS). */
export type ApplicationStatus =
  | 'submitted'
  | 'under-review'
  | 'profile-evaluated'
  | 'shortlisted'
  | 'interview-scheduled'
  | 'audition-requested'
  | 'selected'
  | 'talent-pool'
  | 'assignment-offered'
  | 'rejected';

/** Visual + semantic metadata for a status, used by status timelines/badges. */
export interface StatusMeta {
  status: ApplicationStatus;
  label: string;
  description: string;
  /** Tailwind text colour token used for the badge/dot. */
  tone: 'gold' | 'pink' | 'white' | 'green' | 'red';
  /** A status from which the application cannot advance further. */
  terminal: boolean;
}

export const STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  'submitted': {
    status: 'submitted',
    label: 'Submitted',
    description: 'Your application has been received and queued for review.',
    tone: 'white',
    terminal: false,
  },
  'under-review': {
    status: 'under-review',
    label: 'Under Review',
    description: 'Our team is reviewing your profile and submitted details.',
    tone: 'gold',
    terminal: false,
  },
  'profile-evaluated': {
    status: 'profile-evaluated',
    label: 'Profile Evaluated',
    description: 'Your portfolio and experience have been assessed against current briefs.',
    tone: 'gold',
    terminal: false,
  },
  'shortlisted': {
    status: 'shortlisted',
    label: 'Shortlisted',
    description: 'You have been shortlisted for an upcoming opportunity.',
    tone: 'gold',
    terminal: false,
  },
  'interview-scheduled': {
    status: 'interview-scheduled',
    label: 'Interview Scheduled',
    description: 'An interview or discussion has been scheduled with our team.',
    tone: 'pink',
    terminal: false,
  },
  'audition-requested': {
    status: 'audition-requested',
    label: 'Audition Requested',
    description: 'You have been invited to an audition or callback.',
    tone: 'pink',
    terminal: false,
  },
  'selected': {
    status: 'selected',
    label: 'Selected',
    description: 'Congratulations — you have been selected for the project.',
    tone: 'green',
    terminal: true,
  },
  'talent-pool': {
    status: 'talent-pool',
    label: 'Talent Pool',
    description: 'Added to our curated talent pool for future matching.',
    tone: 'gold',
    terminal: false,
  },
  'assignment-offered': {
    status: 'assignment-offered',
    label: 'Assignment Offered',
    description: 'A specific assignment or engagement has been offered to you.',
    tone: 'green',
    terminal: false,
  },
  'rejected': {
    status: 'rejected',
    label: 'Not Progressed',
    description: 'This application did not progress further at this time.',
    tone: 'red',
    terminal: true,
  },
};

/** Workflow tracks. Each maps to a happy-path ordered sequence of statuses. */
export type WorkflowTrack = 'talent' | 'casting' | 'media' | 'manpower';

/**
 * Ordered "happy path" for each track. The terminal `rejected` status is a
 * branch reachable from any step and is intentionally excluded from the path.
 */
export const FLOWS: Record<WorkflowTrack, ApplicationStatus[]> = {
  // Module 1 — Talent & Career Portal
  talent: ['submitted', 'under-review', 'profile-evaluated', 'talent-pool', 'assignment-offered'],
  // Module 2 — Casting Application System
  casting: ['submitted', 'under-review', 'audition-requested', 'shortlisted', 'selected'],
  // Module 3 — Media Professional Registration
  media: ['submitted', 'under-review', 'profile-evaluated', 'shortlisted', 'assignment-offered'],
  // Module 4 — Manpower Requirement (organisation-facing intake)
  manpower: ['submitted', 'under-review', 'profile-evaluated', 'interview-scheduled', 'selected'],
};

/** Returns the ordered StatusMeta list for a track (for status timelines). */
export function flowMeta(track: WorkflowTrack): StatusMeta[] {
  return FLOWS[track].map((s) => STATUS_META[s]);
}

/** A single status-change record — append-only history for an ATS/CRM. */
export interface StatusEvent {
  status: ApplicationStatus;
  /** ISO timestamp set by the backend when the transition occurs. */
  at?: string;
  /** Optional internal note attached to the transition. */
  note?: string;
  /** Admin user id who performed the transition (future ATS). */
  byUserId?: string;
}
