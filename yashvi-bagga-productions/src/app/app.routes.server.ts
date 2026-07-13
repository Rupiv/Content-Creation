import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'services',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'casting-services',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'talent-network',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'it-solutions',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'workforce-solutions',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'vocational-training',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'join-network',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'casting-application',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'media-professional',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'manpower-requirement',
    renderMode: RenderMode.Prerender,
  },
  // Not part of PDF requirement — prerender route commented out
  // {
  //   path: 'our-process',
  //   renderMode: RenderMode.Prerender,
  // },
  {
    path: 'portfolio',
    renderMode: RenderMode.Prerender,
  },
  // Not part of PDF requirement — prerender route commented out
  // {
  //   path: 'collaborations',
  //   renderMode: RenderMode.Prerender,
  // },
  {
    path: 'testimonials',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
