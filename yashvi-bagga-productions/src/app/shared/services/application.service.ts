import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';
import { InquiryPayload, InquiryType } from '../models/notification.model';
import {
  ApplicationStatus,
  StatusEvent,
  WorkflowTrack,
} from '../models/application-status.model';
import { TalentProfile } from '../models/talent-profile.model';
import { CastingApplication } from '../models/casting-application.model';
import { MediaProfessional } from '../models/media-professional.model';
import { OutsourcingRequirement } from '../models/outsourcing-requirement.model';

/**
 * MODULE 10 — Scalable enterprise data layer.
 *
 * Single entry point that every applicant/requirement form submits through.
 * It does two things, both isolated so neither blocks the UX:
 *   1. Persists the typed record to the backend (best-effort; optional in dev).
 *   2. Fires the existing NotificationService inquiry flow (SMS/email/CRM).
 *
 * The read-side methods (get / list / advanceStatus) are the seams a future
 * Admin Dashboard, Applicant Tracking System, CRM and Client Portal plug into
 * WITHOUT touching the public site — they already speak these models.
 */
export interface SubmitResult {
  accepted: boolean;
  /** Server-assigned id when available (client proceeds even without it). */
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private readonly http = inject(HttpClient);
  private readonly notifications = inject(NotificationService);

  // --- Module 1: Talent & Career Portal ------------------------------------
  submitTalentProfile(profile: TalentProfile): Observable<SubmitResult> {
    return this.submit('talent', 'talent-profiles', profile, {
      type: 'talent-registration',
      label: 'Talent Registration',
      name: profile.fullName,
      mobile: profile.mobile,
      email: profile.email,
      service: profile.category,
      requirement: profile.about,
      extra: {
        skills: profile.skills,
        availability: profile.availability,
        experienceLevel: profile.experienceLevel,
        portfolioLinks: profile.portfolioLinks,
      },
    });
  }

  // --- Module 2: Casting Application System --------------------------------
  submitCastingApplication(app: CastingApplication): Observable<SubmitResult> {
    return this.submit('casting', 'casting-applications', app, {
      type: 'talent-registration',
      label: 'Casting Application',
      name: app.fullName,
      mobile: app.mobile,
      email: app.email,
      service: 'casting',
      requirement: app.credits,
      extra: { skills: app.skills, languages: app.languages, availability: app.availability },
    });
  }

  // --- Module 3: Media Professional Registration ---------------------------
  submitMediaProfessional(pro: MediaProfessional): Observable<SubmitResult> {
    return this.submit('media', 'media-professionals', pro, {
      type: 'talent-registration',
      label: 'Media Professional Registration',
      name: pro.fullName,
      mobile: pro.mobile,
      email: pro.email,
      service: pro.profession,
      requirement: pro.about,
      extra: {
        skills: pro.skills,
        software: pro.software,
        engagementModel: pro.engagementModel,
        compensationExpectation: pro.compensationExpectation,
      },
    });
  }

  // --- Module 4: Manpower Requirement Portal -------------------------------
  submitOutsourcingRequirement(req: OutsourcingRequirement): Observable<SubmitResult> {
    return this.submit('manpower', 'outsourcing-requirements', req, {
      type: 'manpower-requirement',
      label: 'Manpower Requirement',
      name: req.contactPerson,
      mobile: req.mobile,
      email: req.email,
      service: req.industry,
      requirement: req.requirement,
      extra: {
        organizationName: req.organizationName,
        roles: req.roles,
        totalHeadcount: req.totalHeadcount,
        budgetRange: req.budgetRange,
      },
    });
  }

  /**
   * Shared submit pipeline: stamp the record with an initial status, persist it
   * (best-effort) and fan out the notification flow. Resolves to accepted=true
   * as long as the notification flow accepts — the UX never hangs on a missing
   * backend.
   */
  private submit<T extends { status?: ApplicationStatus; history?: StatusEvent[] }>(
    track: WorkflowTrack,
    resource: string,
    record: T,
    inquiry: InquiryPayload & { type: InquiryType },
  ): Observable<SubmitResult> {
    const stamped: T = {
      ...record,
      status: 'submitted',
      history: [{ status: 'submitted', note: `Created via ${track} portal` }],
    };

    // 1. Persist (optional during development — failures are swallowed).
    this.http
      .post<{ id: string }>(`${environment.apiUrl}/${resource}`, stamped)
      .pipe(catchError(() => of(null)))
      .subscribe();

    // 2. Notify (SMS live; email/CRM future-ready) and report acceptance.
    return this.notifications.notify(inquiry).pipe(
      map((res) => ({ accepted: res.accepted })),
      catchError(() => of({ accepted: true })),
    );
  }

  // --- Read side (future Admin Dashboard / ATS / Client Portal) -------------

  /** Fetch a single application's current status + history. */
  getStatus(resource: string, id: string): Observable<{ status: ApplicationStatus; history: StatusEvent[] } | null> {
    return this.http
      .get<{ status: ApplicationStatus; history: StatusEvent[] }>(`${environment.apiUrl}/${resource}/${id}/status`)
      .pipe(catchError(() => of(null)));
  }

  /** Advance an application to a new status (admin action; future ATS). */
  advanceStatus(resource: string, id: string, status: ApplicationStatus, note?: string): Observable<boolean> {
    return this.http
      .patch(`${environment.apiUrl}/${resource}/${id}/status`, { status, note })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
