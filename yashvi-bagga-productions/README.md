# Yashvi Bagga Productions — Premium Creative Agency Website

## Tech Stack
- **Angular 20+** with Standalone Components
- **Angular SSR** (Server-Side Rendering) with Prerendering
- **TypeScript** (strict mode)
- **Tailwind CSS** + **SCSS**
- **GSAP** animations
- **Reactive Forms** with multi-step contact
- **Angular Signals** for state management
- **Lazy Loading** on all routes

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Serve SSR build
npm run serve:ssr
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       ├── animation.service.ts    # GSAP animation utilities
│   │       ├── seo.service.ts          # Meta tags & SEO management
│   │       └── scroll.service.ts       # Scroll state & utilities
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/                 # Premium navigation with mobile menu
│   │   │   ├── footer/                 # Full footer with links & socials
│   │   │   ├── magnetic-button/        # GSAP magnetic hover effect
│   │   │   ├── loading/                # Cinematic loading screen
│   │   │   ├── whatsapp-button/        # Floating WhatsApp CTA
│   │   │   └── section-header/         # Reusable section headers
│   │   └── directives/
│   │       └── scroll-animation.directive.ts  # Intersection Observer animations
│   ├── pages/
│   │   ├── home/                       # Full cinematic homepage
│   │   ├── about/                      # Agency story, team, process
│   │   ├── services/                   # Animated service cards
│   │   ├── portfolio/                  # Masonry grid with filters
│   │   ├── collaborations/             # Brand & creator onboarding
│   │   ├── testimonials/               # Reviews & video testimonials
│   │   └── contact/                    # Multi-step premium form
│   ├── app.component.ts               # Root shell
│   ├── app.config.ts                  # Client providers
│   ├── app.config.server.ts           # Server providers
│   ├── app.routes.ts                  # Lazy-loaded routes
│   └── app.routes.server.ts           # SSR render modes
├── styles.scss                        # Global styles & utilities
├── index.html                         # SEO-optimized HTML shell
├── main.ts                            # Browser bootstrap
└── main.server.ts                     # Server bootstrap
```

## Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Matte Black | `#0A0A0A` | Primary background |
| Luxury Gold | `#D4AF37` | Accents, CTAs, highlights |
| Soft White | `#F5F5F5` | Text, content |
| Neon Pink | `#FF2E88` | Secondary accent, CTAs |

### Typography
- **Headings:** Playfair Display (serif, editorial feel)
- **Body:** Poppins (clean, modern, readable)

### Features
- Cinematic fullscreen hero with animated gradients
- GSAP scroll-triggered animations
- Magnetic button effects
- Glassmorphism cards
- Multi-step contact form with validation
- Intersection Observer reveal animations
- Mobile-first responsive design
- Loading screen with brand animation
- Floating WhatsApp button
- Back-to-top button
- Smart navbar (hide on scroll down, show on scroll up)
- SEO meta tags per page
- Prerendered pages for maximum performance

## Performance
- All routes are lazy-loaded
- SSR with prerendering for SEO
- Tailwind purges unused CSS
- Images lazy-loaded (when added)
- Optimized for Core Web Vitals
