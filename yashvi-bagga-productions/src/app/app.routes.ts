import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: { animation: 'home' },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: { animation: 'about' },
  },
  {
    path: 'services',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
        data: { animation: 'services' },
      },
      {
        path: 'creative-media',
        loadComponent: () => import('./pages/services/creative-media/creative-media.component').then(m => m.CreativeMediaComponent),
        data: { animation: 'creative-media' },
      },
      {
        path: 'it-solutions',
        loadComponent: () => import('./pages/services/it-solutions/it-solutions.component').then(m => m.ItSolutionsComponent),
        data: { animation: 'it-solutions' },
      },
      {
        path: 'manpower-outsourcing',
        loadComponent: () => import('./pages/services/manpower-outsourcing/manpower-outsourcing.component').then(m => m.ManpowerOutsourcingComponent),
        data: { animation: 'manpower-outsourcing' },
      },
      {
        path: 'vocational-training',
        loadComponent: () => import('./pages/services/vocational-training/vocational-training.component').then(m => m.VocationalTrainingComponent),
        data: { animation: 'vocational-training' },
      },
    ],
  },
  {
    path: 'casting-services',
    loadComponent: () => import('./pages/network/talent-hub/talent-hub.component').then(m => m.TalentHubComponent),
    data: { animation: 'casting-services', mode: 'casting' },
  },
  {
    path: 'talent-network',
    loadComponent: () => import('./pages/network/talent-hub/talent-hub.component').then(m => m.TalentHubComponent),
    data: { animation: 'talent-network', mode: 'network' },
  },
  {
    path: 'it-solutions',
    loadComponent: () => import('./pages/services/it-solutions/it-solutions.component').then(m => m.ItSolutionsComponent),
    data: { animation: 'it-solutions' },
  },
  {
    path: 'workforce-solutions',
    loadComponent: () => import('./pages/services/manpower-outsourcing/manpower-outsourcing.component').then(m => m.ManpowerOutsourcingComponent),
    data: { animation: 'workforce-solutions' },
  },
  {
    path: 'vocational-training',
    loadComponent: () => import('./pages/services/vocational-training/vocational-training.component').then(m => m.VocationalTrainingComponent),
    data: { animation: 'vocational-training' },
  },
  {
    path: 'join-network',
    loadComponent: () => import('./pages/network/join-network/join-network.component').then(m => m.JoinNetworkComponent),
    data: { animation: 'join-network' },
  },
  {
    path: 'casting-application',
    loadComponent: () => import('./pages/casting/casting-application.component').then(m => m.CastingApplicationComponent),
    data: { animation: 'casting-application' },
  },
  {
    path: 'media-professional',
    loadComponent: () => import('./pages/network/media-professional/media-professional.component').then(m => m.MediaProfessionalComponent),
    data: { animation: 'media-professional' },
  },
  {
    path: 'manpower-requirement',
    loadComponent: () => import('./pages/workforce/manpower-requirement.component').then(m => m.ManpowerRequirementComponent),
    data: { animation: 'manpower-requirement' },
  },
  // Not part of PDF requirement — route commented out (page kept in repo)
  // {
  //   path: 'our-process',
  //   loadComponent: () => import('./pages/process/business-process.component').then(m => m.BusinessProcessComponent),
  //   data: { animation: 'our-process' },
  // },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent),
    data: { animation: 'portfolio' },
  },
  // Not part of PDF requirement — route commented out (page kept in repo)
  // {
  //   path: 'collaborations',
  //   loadComponent: () => import('./pages/collaborations/collaborations.component').then(m => m.CollaborationsComponent),
  //   data: { animation: 'collaborations' },
  // },
  {
    path: 'testimonials',
    loadComponent: () => import('./pages/testimonials/testimonials.component').then(m => m.TestimonialsComponent),
    data: { animation: 'testimonials' },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: { animation: 'contact' },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
