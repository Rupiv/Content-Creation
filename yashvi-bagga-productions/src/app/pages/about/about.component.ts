import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FoundationNoteCardComponent } from '../../shared/components/foundation-note-card/foundation-note-card.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective, SectionHeaderComponent, FoundationNoteCardComponent],
  template: `
    <!-- ============================= HERO ============================= -->
    <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-brand-black">
        <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-brand-pink/8 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[4px] uppercase mb-4 animate-fade-in">Who We Are</span>
        <h1 class="heading-xl text-brand-white mb-6 animate-slide-up">
          More Than A <span class="gradient-text">Production</span> House
        </h1>
        <p class="body-lg text-brand-white/60 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.3s;">
          Every story has the power to inspire, every experience the ability to transform,
          and every brand deserves to be remembered.
        </p>
      </div>
    </section>

    <!-- ===================== THE BRAND — INTRO ===================== -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Foundation Note panel -->
          <div class="relative" appScrollAnimation animationType="fade-left">
            <app-foundation-note-card
              title="Foundation Note"
              subtitle="Every Dream Begins With A Vision"
              [story]="foundationStory"
              quote="I dedicate this venture to every dreamer who believes that creativity can create opportunities and transform lives."
              founderName="Yashvi Bagga"
              founderRole="Founder"
            />
          </div>

          <!-- The Brand intro copy -->
          <div appScrollAnimation animationType="fade-right">
            <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">The Brand</span>
            <h2 class="heading-md text-brand-white mt-4 mb-6">
              A Multidisciplinary <span class="gradient-text">Creative</span> Organization
            </h2>
            <div class="space-y-4 text-brand-white/60 font-poppins text-sm leading-relaxed">
              @for (paragraph of brandIntro; track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== BRAND PHILOSOPHY ===================== -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>
      <div class="relative max-w-4xl mx-auto text-center" appScrollAnimation animationType="fade-up">
        <span class="inline-block text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-4">Our Brand Philosophy</span>
        <p class="heading-md text-brand-white mb-8">
          We don't merely execute projects&mdash;<br class="hidden md:block" />
          <span class="gradient-text">we create experiences.</span>
        </p>
        <p class="body-md text-brand-white/60 max-w-3xl mx-auto">
          Every assignment entrusted to us is approached with creativity, precision, strategic thinking,
          and a deep understanding of our client's vision. Whether it is conducting executive development
          programmes, producing impactful visual content, managing large-scale events, building digital
          campaigns, or nurturing creative talent, we strive to deliver solutions that are innovative,
          engaging, and result-oriented.
        </p>
      </div>
    </section>

    <!-- ================== WHAT DEFINES OUR BRAND ================== -->
    <section class="section-padding bg-brand-black relative">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          subtitle="What Defines Us"
          title="What Defines Our Brand"
          description="The principles that shape every decision, every project, and every partnership."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (value of brandValues; track value.title; let i = $index) {
            <div
              class="glass-card p-8 hover:border-brand-gold/30 transition-all duration-500 group"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="i * 100"
            >
              <div class="w-14 h-14 mb-6 rounded-xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors duration-500">
                <span class="text-2xl">{{ value.icon }}</span>
              </div>
              <h3 class="text-lg font-playfair text-brand-white mb-3 group-hover:text-brand-gold transition-colors">{{ value.title }}</h3>
              <p class="text-brand-white/50 font-poppins text-sm leading-relaxed">{{ value.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ===================== VISION & MISSION ===================== -->
    <section class="section-padding bg-brand-dark relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Vision -->
          <div class="glass-card-gold p-8 md:p-10" appScrollAnimation animationType="fade-left">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">🎯</span>
              <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">Our Vision</span>
            </div>
            <p class="text-brand-white/80 font-playfair text-xl md:text-2xl italic leading-relaxed">
              To become one of India's most respected creative and professional services brands,
              recognized for transforming ideas into impactful experiences through innovation,
              excellence, and integrity.
            </p>
          </div>

          <!-- Mission -->
          <div class="glass-card p-8 md:p-10" appScrollAnimation animationType="fade-right">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">🚀</span>
              <span class="text-brand-gold font-poppins text-sm tracking-[3px] uppercase">Our Mission</span>
            </div>
            <ul class="space-y-4">
              @for (item of mission; track $index) {
                <li class="flex items-start gap-3 text-brand-white/60 font-poppins text-sm leading-relaxed">
                  <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= OUR PROMISE & BRAND ESSENCE ================= -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-gold/5 rounded-full blur-[140px]"></div>
      <div class="relative max-w-4xl mx-auto text-center">
        <div appScrollAnimation animationType="fade-up">
          <span class="inline-block text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-4">Our Promise</span>
          <div class="space-y-4 text-brand-white/60 font-poppins text-base leading-relaxed mb-12">
            <p>
              At Yashvi Bagga Productions, every project is treated as an opportunity to create value,
              inspire change, and exceed expectations. We are committed to delivering solutions that
              are not only creative but also purposeful, professional, and impactful.
            </p>
            <p>
              Yashvi Bagga Productions is not just a service provider&mdash;we are a brand that empowers
              people, elevates organizations, and creates experiences that leave a lasting legacy.
            </p>
          </div>
        </div>

        <!-- Brand Essence banner -->
        <div
          class="glass-card-gold rounded-2xl py-12 px-8"
          appScrollAnimation
          animationType="scale"
        >
          <span class="block text-brand-white/40 font-poppins text-xs tracking-[4px] uppercase mb-5">Our Brand Essence</span>
          <p class="heading-md gradient-text leading-tight">
            Creating Experiences.<br />
            Inspiring Excellence. Building Impact.
          </p>
        </div>

        <!-- Taglines -->
        <div class="mt-12" appScrollAnimation animationType="fade-up">
          <p class="text-brand-white/40 font-poppins text-xs tracking-[3px] uppercase mb-6">In A Few Words</p>
          <div class="flex flex-wrap justify-center gap-3">
            @for (tagline of taglines; track $index) {
              <span class="px-5 py-2.5 rounded-full glass-card text-brand-white/70 font-poppins text-sm hover:border-brand-gold/30 hover:text-brand-gold transition-all duration-300">
                {{ tagline }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= THE TEAM ========================= -->
    <section class="section-padding bg-brand-dark relative">
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="The Team"
          title="The Minds Behind The Magic"
          description="A passionate group of professionals committed to delivering impactful marketing solutions, compelling content, innovative designs, and seamless production services."
          appScrollAnimation
          animationType="fade-up"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (role of team; track role.title; let i = $index) {
            <div
              class="group relative glass-card p-7 overflow-hidden hover:border-brand-gold/30 transition-all duration-500"
              appScrollAnimation
              animationType="fade-up"
              [animationDelay]="(i % 3) * 100"
            >
              <div class="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-brand-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative flex items-start gap-4">
                <div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-pink/10 flex items-center justify-center border border-brand-gold/10">
                  <span class="text-xl">{{ role.icon }}</span>
                </div>
                <div>
                  <h3 class="text-base font-playfair text-brand-white group-hover:text-brand-gold transition-colors leading-snug">{{ role.title }}</h3>
                </div>
              </div>
              <p class="relative mt-4 text-brand-white/50 font-poppins text-sm leading-relaxed">{{ role.description }}</p>
            </div>
          }
        </div>

        <!-- Team commitment -->
        <div
          class="mt-12 glass-card-gold rounded-2xl p-8 md:p-10 text-center max-w-4xl mx-auto"
          appScrollAnimation
          animationType="fade-up"
        >
          <span class="inline-block text-brand-gold font-poppins text-sm tracking-[3px] uppercase mb-4">Our Commitment</span>
          <p class="text-brand-white/70 font-poppins text-base leading-relaxed mb-4">
            Together, we work with a shared vision&mdash;to create meaningful content, build powerful
            brand identities, empower talent, and deliver innovative solutions that help our clients
            succeed in the ever-evolving digital landscape.
          </p>
          <p class="text-brand-white/80 font-playfair italic text-lg">
            Every team member contributes to one common goal: transforming creative ideas into measurable impact.
          </p>
        </div>
      </div>
    </section>

    <!-- ======================== OUR NETWORK ======================== -->
    <section class="section-padding bg-brand-black relative overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/8 rounded-full blur-[130px]"></div>
      <div class="relative max-w-7xl mx-auto">
        <app-section-header
          subtitle="Our Network"
          title="Delivering Excellence Across India"
          description="A robust, Pan-India ecosystem that lets us execute projects efficiently in every region of the country."
          [titleGradient]="true"
          appScrollAnimation
          animationType="fade-up"
        />

        <!-- Network intro copy -->
        <div class="max-w-3xl mx-auto space-y-4 text-brand-white/60 font-poppins text-sm leading-relaxed text-center mb-16" appScrollAnimation animationType="fade-up">
          @for (paragraph of networkIntro; track $index) {
            <p>{{ paragraph }}</p>
          }
        </div>

        <!-- A Strong Network of Professionals -->
        <div class="glass-card p-8 md:p-10 mb-8" appScrollAnimation animationType="fade-up">
          <h3 class="heading-sm text-brand-white mb-2">A Strong Network of Professionals</h3>
          <p class="text-brand-white/40 font-poppins text-sm mb-8">Our Pan-India network comprises:</p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            @for (pro of networkProfessionals; track $index; let i = $index) {
              <li
                class="flex items-start gap-3 text-brand-white/70 font-poppins text-sm leading-relaxed"
                appScrollAnimation
                animationType="fade-up"
                [animationDelay]="(i % 4) * 60"
              >
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 rotate-45"></span>
                <span>{{ pro }}</span>
              </li>
            }
          </ul>
        </div>

        <!-- Reach + Scalability -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="glass-card p-8 md:p-10" appScrollAnimation animationType="fade-left">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl">📍</span>
              <h3 class="heading-sm text-brand-white">Nationwide Reach. Local Expertise.</h3>
            </div>
            <div class="space-y-4 text-brand-white/55 font-poppins text-sm leading-relaxed">
              <p>
                Our network extends across metropolitan cities, state capitals, Tier-II and Tier-III cities,
                enabling us to undertake assignments anywhere in India with the same level of professionalism
                and operational excellence.
              </p>
              <p>
                Whether it is conducting executive training programmes, managing government outreach campaigns,
                executing media productions, organizing conferences and events, deploying manpower, or
                implementing large-scale communication initiatives, our geographically diverse network ensures
                timely execution and consistent quality.
              </p>
            </div>
          </div>

          <div class="glass-card p-8 md:p-10" appScrollAnimation animationType="fade-right">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl">⚙️</span>
              <h3 class="heading-sm text-brand-white">Scalability with Consistency</h3>
            </div>
            <div class="space-y-4 text-brand-white/55 font-poppins text-sm leading-relaxed">
              <p>
                Our decentralized yet integrated approach allows us to manage multiple projects simultaneously
                across different locations while maintaining standardized processes, quality benchmarks, and
                client satisfaction.
              </p>
              <p>
                From concept development to execution and post-project support, every assignment is coordinated
                through structured project management systems, ensuring transparency, accountability, and
                seamless delivery.
              </p>
            </div>
          </div>
        </div>

        <!-- Trusted Across Sectors -->
        <div class="glass-card-gold p-8 md:p-10 mb-12" appScrollAnimation animationType="fade-up">
          <h3 class="heading-sm text-brand-white mb-2">Trusted Across Sectors</h3>
          <p class="text-brand-white/40 font-poppins text-sm mb-8">
            Our Pan-India capabilities enable us to serve a diverse clientele, including:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (sector of networkSectors; track $index; let i = $index) {
              <div
                class="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-white/[0.02] border border-brand-white/5 hover:border-brand-gold/25 transition-colors duration-300"
                appScrollAnimation
                animationType="fade-up"
                [animationDelay]="(i % 3) * 80"
              >
                <span class="w-2 h-2 rounded-full bg-gradient-to-br from-brand-gold to-brand-pink shrink-0"></span>
                <span class="text-brand-white/70 font-poppins text-sm">{{ sector }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Network commitment -->
        <div class="max-w-4xl mx-auto text-center" appScrollAnimation animationType="fade-up">
          <p class="text-brand-white/60 font-poppins text-base leading-relaxed mb-8">
            Wherever our clients are located, Yashvi Bagga Productions brings together the right expertise,
            the right people, and the right resources to deliver impactful solutions with professionalism,
            creativity, and excellence.
          </p>
          <p class="heading-md gradient-text leading-tight mb-8">
            One Network. One Standard.<br />
            One Commitment to Excellence.
          </p>
          <p class="text-brand-white/50 font-poppins text-sm leading-relaxed max-w-3xl mx-auto">
            Our Pan-India network reflects our vision of building a truly national organization capable of
            delivering world-class creative, communication, training, branding, and production
            services&mdash;anywhere, anytime, and at any scale.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  /** Foundation Note card story (paired with The Brand intro) */
  foundationStory = [
    'YASHVI BAGGA PRODUCTIONS was founded with the belief that creativity has the power to inspire, influence, and transform businesses, brands, and individuals. In an era where digital presence defines success, we envisioned a platform that brings together talent, innovation, storytelling, and strategic marketing under one roof.',
    'What started as a passion for creating meaningful content has evolved into a dedicated venture focused on helping brands build authentic connections with their audiences. We believe that every brand has a story worth telling, every creator deserves an opportunity to shine, and every campaign should leave a lasting impact.',
    'At YASHVI BAGGA PRODUCTIONS, we specialize in Social Media Management, Talent Sourcing, Brand Marketing, Influencer Collaborations, Creative Content Development, and End-to-End Production Services. Our mission is to bridge the gap between brands and audiences through innovative ideas, compelling narratives, and result-oriented strategies.',
    'As an emerging production company, we are committed to professionalism, creativity, integrity, and excellence in every project we undertake. We aspire to create a vibrant ecosystem where businesses grow, talents flourish, and creative visions come to life.',
    'This foundation is not merely the beginning of a company; it is the beginning of a journey driven by passion, perseverance, and purpose. We look forward to building meaningful partnerships, nurturing creative talent, and contributing to the ever-evolving world of digital media and brand communication.',
    'With gratitude and determination, we embark on this exciting journey, believing that the best stories are yet to be told.',
  ];

  /** THE BRAND — introduction */
  brandIntro = [
    'At Yashvi Bagga Productions, we believe that every story has the power to inspire, every experience has the ability to transform, and every brand deserves to be remembered.',
    'We are a dynamic, multidisciplinary organization that seamlessly blends media, communication, learning, branding, and creative production to deliver meaningful experiences and measurable impact. Our work extends beyond conventional service delivery—we build powerful narratives, develop people, strengthen institutions, and create lasting impressions.',
    'With a strong foundation in innovation, professionalism, and excellence, Yashvi Bagga Productions has emerged as a trusted partner for Government organizations, Public Sector Enterprises, Corporate Houses, Educational Institutions, and Development Agencies. Our expertise spans strategic communication, professional training, event management, digital media, filmmaking, branding, talent management, and creative consulting.',
  ];

  /** What Defines Our Brand */
  brandValues = [
    { icon: '💡', title: 'Innovation with Purpose', description: 'We constantly explore new ideas, technologies, and creative approaches to deliver contemporary and impactful solutions.' },
    { icon: '🏆', title: 'Excellence in Execution', description: 'Quality, professionalism, and attention to detail form the cornerstone of every project we undertake.' },
    { icon: '🤝', title: 'People-Centric Approach', description: 'We believe that people are at the heart of every successful organization. Our training, communication, and creative solutions are designed to inspire growth, confidence, and transformation.' },
    { icon: '🛡️', title: 'Integrity & Trust', description: 'Long-term relationships are built on transparency, commitment, and ethical business practices—values that define our organization.' },
    { icon: '🎨', title: 'Creativity Beyond Boundaries', description: 'From concept to completion, we combine imagination with strategic execution to produce work that is distinctive and memorable.' },
  ];

  /** Our Mission */
  mission = [
    'To deliver world-class creative, media, branding, and learning solutions.',
    'To empower organizations and individuals through knowledge, communication, and innovation.',
    'To build meaningful partnerships founded on trust, quality, and measurable outcomes.',
    'To create content and experiences that educate, engage, inspire, and influence.',
  ];

  /** Brand taglines */
  taglines = [
    'Creating Impact. Inspiring Excellence.',
    'Where Creativity Meets Purpose.',
    'Transforming Ideas into Experiences.',
    'Beyond Production. Beyond Expectations.',
    'Building Brands. Developing People. Creating Stories.',
    'Innovation • Creativity • Excellence.',
  ];

  /** THE TEAM — roles & responsibilities */
  team = [
    { icon: '📈', title: 'Marketing Head', description: 'Leading our strategic marketing initiatives, the Marketing Head is responsible for brand positioning, campaign planning, client relationship management, and business growth. Through market insights and innovative strategies, this role ensures that every project achieves maximum reach and engagement.' },
    { icon: '🎨', title: 'Creative Design Head', description: 'The Creative Design Head oversees the visual identity and creative direction of all projects. From conceptualizing brand aesthetics to ensuring consistency across campaigns, this role transforms ideas into powerful visual experiences that resonate with audiences.' },
    { icon: '📊', title: 'Accounts Manager', description: 'Our Accounts Manager ensures smooth financial operations, project budgeting, vendor coordination, and client billing management. With a focus on transparency and efficiency, this role supports the organization\'s sustainable growth and operational excellence.' },
    { icon: '🖌️', title: 'Lead Graphic Designer', description: 'The Lead Graphic Designer brings concepts to life through captivating visual designs. From social media creatives and branding materials to marketing collateral and campaign assets, this role ensures that every visual element reflects creativity, professionalism, and innovation.' },
    { icon: '✍️', title: 'Lead Content Manager', description: 'The Lead Content Manager is responsible for developing compelling content strategies and managing content creation across various platforms. Through engaging storytelling and audience-focused communication, this role helps brands establish meaningful connections with their target audience.' },
    { icon: '🎬', title: 'Audio-Visual Production Head', description: 'The Audio-Visual Production Head leads the planning, production, and execution of video, photography, and multimedia projects. From concept development to final delivery, this role ensures high-quality production standards that effectively communicate brand messages.' },
    { icon: '📱', title: 'Social Media Management Team', description: 'Our social media specialists monitor trends, create engaging content calendars, manage online communities, and execute platform-specific strategies to maximize digital visibility and audience engagement.' },
    { icon: '🌟', title: 'Talent Sourcing & Influencer Relations Team', description: 'This team identifies, evaluates, and manages collaborations with creators, influencers, artists, and industry professionals. Their expertise helps connect brands with the right talent to create authentic and impactful campaigns.' },
    { icon: '🎞️', title: 'Video Editors & Post-Production Team', description: 'Our editing professionals transform raw footage into polished visual stories through expert editing, motion graphics, sound synchronization, and post-production enhancements.' },
    { icon: '📝', title: 'Content Writers & Creative Strategists', description: 'The creative writing team develops scripts, campaign concepts, brand stories, website content, social media copy, and marketing communications that inspire action and drive engagement.' },
  ];

  /** OUR NETWORK — introduction */
  networkIntro = [
    'At Yashvi Bagga Productions, our strength lies not only in our expertise but also in our extensive Pan-India network that enables us to deliver seamless, high-quality services across the country.',
    'With a robust ecosystem of experienced professionals, creative specialists, certified trainers, consultants, filmmakers, media experts, event managers, digital marketers, designers, technical personnel, and support staff, we have built the capability to execute projects efficiently in every region of India.',
    'Our nationwide presence allows us to mobilize resources quickly, understand regional dynamics, and provide customized solutions that are culturally relevant, professionally executed, and aligned with our clients\' objectives.',
  ];

  /** Network — a strong network of professionals */
  networkProfessionals = [
    'Senior Corporate Trainers and Subject Matter Experts',
    'Behavioural Skills & Leadership Development Facilitators',
    'Artificial Intelligence & Digital Technology Experts',
    'Social Media Strategists and Digital Marketing Professionals',
    'Film Makers, Directors, Cinematographers & Editors',
    'Photographers and Creative Content Specialists',
    'Graphic Designers, Animators and Motion Graphics Experts',
    'Event Managers and Production Teams',
    'Anchors, Moderators and Master of Ceremonies',
    'Actors, Models, Voice Artists and Creative Talent',
    'HR Consultants and Recruitment Professionals',
    'Technical Support Teams and Project Coordinators',
    'Regional Associates and Local Execution Partners',
  ];

  /** Network — trusted across sectors */
  networkSectors = [
    'Ministries and Government Departments',
    'Public Sector Undertakings (PSUs)',
    'Central & State Training Institutes',
    'Educational Institutions & Universities',
    'Corporate Organizations',
    'Development Agencies & NGOs',
    'Start-ups and MSMEs',
    'Media & Entertainment Industry',
    'Healthcare and Social Sector Organizations',
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'About Us | Yashvi Bagga Productions',
      description: 'Discover the brand, the team, and the Pan-India network behind Yashvi Bagga Productions — a multidisciplinary creative, media, branding, and training organization.',
    });
  }
}
