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
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent),
    data: { animation: 'portfolio' },
  },
  {
    path: 'collaborations',
    loadComponent: () => import('./pages/collaborations/collaborations.component').then(m => m.CollaborationsComponent),
    data: { animation: 'collaborations' },
  },
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
