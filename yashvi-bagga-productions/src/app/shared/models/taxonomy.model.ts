/**
 * Shared, single-source taxonomy for every workflow module.
 *
 * Categories, skills, industries and engagement models live here so the public
 * forms, the future Admin Dashboard and any reporting layer all speak the same
 * vocabulary. Each entry carries a stable `slug` (safe to persist) plus a human
 * `label` and an `icon` for the brand UI.
 */

export interface TaxonomyOption {
  slug: string;
  label: string;
  icon?: string;
  description?: string;
}

/** MODULE 1 — the 12 Talent & Career Portal categories. */
export const TALENT_CATEGORIES: TaxonomyOption[] = [
  { slug: 'actor', label: 'Actor', icon: '🎭', description: 'Screen, ad and performance casting.' },
  { slug: 'model', label: 'Model', icon: '📸', description: 'Fashion, beauty and campaign shoots.' },
  { slug: 'influencer', label: 'Influencer', icon: '✨', description: 'Creator campaigns and brand deals.' },
  { slug: 'photographer', label: 'Photographer', icon: '📷', description: 'Editorial and commercial imagery.' },
  { slug: 'videographer', label: 'Videographer', icon: '🎥', description: 'Reels, shoots and motion projects.' },
  { slug: 'graphic-designer', label: 'Graphic Designer', icon: '🎨', description: 'Brand identity and social design.' },
  { slug: 'content-writer', label: 'Content Writer', icon: '📝', description: 'Copy, scripts and storytelling.' },
  { slug: 'video-editor', label: 'Video Editor', icon: '✂️', description: 'Reels and short-form post-production.' },
  { slug: 'makeup-artist', label: 'Makeup Artist', icon: '💄', description: 'Editorial, bridal and campaign looks.' },
  { slug: 'stylist', label: 'Stylist', icon: '🧥', description: 'Fashion and wardrobe styling.' },
  { slug: 'creative-director', label: 'Creative Director', icon: '🎬', description: 'Concept, art direction and vision.' },
  { slug: 'production-coordinator', label: 'Production Coordinator', icon: '📋', description: 'On-set and project coordination.' },
];

/** Experience levels reused across all applicant forms. */
export const EXPERIENCE_LEVELS: TaxonomyOption[] = [
  { slug: 'fresher', label: 'Fresher (0–1 yrs)' },
  { slug: 'beginner', label: 'Beginner (1–2 yrs)' },
  { slug: 'intermediate', label: 'Intermediate (2–4 yrs)' },
  { slug: 'experienced', label: 'Experienced (4–8 yrs)' },
  { slug: 'professional', label: 'Professional (8+ yrs)' },
];

/** Availability preferences reused across talent, casting and media forms. */
export const AVAILABILITY_OPTIONS: TaxonomyOption[] = [
  { slug: 'full-time', label: 'Full Time' },
  { slug: 'part-time', label: 'Part Time' },
  { slug: 'freelance', label: 'Freelance / Per Project' },
  { slug: 'weekends', label: 'Weekends Only' },
  { slug: 'remote', label: 'Remote' },
  { slug: 'on-location', label: 'On Location / Travel' },
];

/** MODULE 3 — preferred engagement models for media professionals. */
export const ENGAGEMENT_MODELS: TaxonomyOption[] = [
  { slug: 'full-time', label: 'Full-Time Employment' },
  { slug: 'contract', label: 'Contract / Fixed Term' },
  { slug: 'freelance', label: 'Freelance / Per Project' },
  { slug: 'retainer', label: 'Monthly Retainer' },
  { slug: 'internship', label: 'Internship' },
];

/** MODULE 3 — common creative software, used for software-expertise tagging. */
export const SOFTWARE_OPTIONS: TaxonomyOption[] = [
  { slug: 'photoshop', label: 'Adobe Photoshop' },
  { slug: 'illustrator', label: 'Adobe Illustrator' },
  { slug: 'premiere-pro', label: 'Adobe Premiere Pro' },
  { slug: 'after-effects', label: 'Adobe After Effects' },
  { slug: 'lightroom', label: 'Adobe Lightroom' },
  { slug: 'indesign', label: 'Adobe InDesign' },
  { slug: 'final-cut', label: 'Final Cut Pro' },
  { slug: 'davinci', label: 'DaVinci Resolve' },
  { slug: 'figma', label: 'Figma' },
  { slug: 'canva', label: 'Canva' },
  { slug: 'capcut', label: 'CapCut' },
  { slug: 'blender', label: 'Blender' },
];

/** MODULE 6 — the 10 industries served, rendered on the home page. */
export const INDUSTRIES: TaxonomyOption[] = [
  { slug: 'education', label: 'Education', icon: '🎓', description: 'Institutions, ed-tech and training brands.' },
  { slug: 'government', label: 'Government', icon: '🏛️', description: 'Public sector campaigns and outreach.' },
  { slug: 'healthcare', label: 'Healthcare', icon: '🩺', description: 'Hospitals, wellness and pharma.' },
  { slug: 'it', label: 'IT', icon: '💻', description: 'Software, SaaS and digital products.' },
  { slug: 'media', label: 'Media', icon: '🎬', description: 'Entertainment, publishing and OTT.' },
  { slug: 'hospitality', label: 'Hospitality', icon: '🏨', description: 'Hotels, travel and lifestyle.' },
  { slug: 'retail', label: 'Retail', icon: '🛍️', description: 'Stores, FMCG and consumer brands.' },
  { slug: 'ecommerce', label: 'E-Commerce', icon: '🛒', description: 'Online marketplaces and D2C.' },
  { slug: 'corporate', label: 'Corporate Organizations', icon: '🏢', description: 'Enterprises and conglomerates.' },
  { slug: 'startups', label: 'Startups', icon: '🚀', description: 'Early-stage and high-growth ventures.' },
];

/** Compensation / budget ranges shared by media + manpower intake. */
export const COMPENSATION_RANGES: TaxonomyOption[] = [
  { slug: 'negotiable', label: 'Negotiable' },
  { slug: 'lt-25k', label: 'Up to ₹25,000 / month' },
  { slug: '25k-50k', label: '₹25,000 – ₹50,000 / month' },
  { slug: '50k-1l', label: '₹50,000 – ₹1,00,000 / month' },
  { slug: '1l-2l', label: '₹1,00,000 – ₹2,00,000 / month' },
  { slug: 'gt-2l', label: '₹2,00,000+ / month' },
];

/** Helper: look up a label from a slug within any option list. */
export function labelOf(options: TaxonomyOption[], slug: string | null | undefined): string {
  return options.find((o) => o.slug === slug)?.label ?? (slug ?? '');
}
