import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foundation-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foundation-note-card.component.html',
  styleUrls: ['./foundation-note-card.component.scss'],
})
export class FoundationNoteCardComponent {
  /** Top label, e.g. "Foundation Note" */
  @Input() title = 'Foundation Note';

  /** Headline / subtitle, e.g. "Every Dream Begins With A Vision" */
  @Input() subtitle = 'Every Dream Begins With A Vision';

  /** Story paragraphs rendered in order */
  @Input() story: string[] = [
    'YASHVI BAGGA PRODUCTIONS was founded with the belief that creativity has the power to inspire, influence, and transform businesses, brands, and individuals. In an era where digital presence defines success, we envisioned a platform that brings together talent, innovation, storytelling, and strategic marketing under one roof.',
    'What started as a passion for creating meaningful content has evolved into a dedicated venture focused on helping brands build authentic connections with their audiences. We believe that every brand has a story worth telling, every creator deserves an opportunity to shine, and every campaign should leave a lasting impact.',
    'At YASHVI BAGGA PRODUCTIONS, we specialize in Social Media Management, Talent Sourcing, Brand Marketing, Influencer Collaborations, Creative Content Development, and End-to-End Production Services. Our mission is to bridge the gap between brands and audiences through innovative ideas, compelling narratives, and result-oriented strategies.',
    'As an emerging production company, we are committed to professionalism, creativity, integrity, and excellence in every project we undertake. We aspire to create a vibrant ecosystem where businesses grow, talents flourish, and creative visions come to life.',
    'This foundation is not merely the beginning of a company; it is the beginning of a journey driven by passion, perseverance, and purpose. We look forward to building meaningful partnerships, nurturing creative talent, and contributing to the ever-evolving world of digital media and brand communication.',
    'With gratitude and determination, we embark on this exciting journey, believing that the best stories are yet to be told.'
  ];

  /** Founder quote rendered in the highlighted block */
  @Input() quote =
    'I dedicate this venture to every dreamer who believes that creativity can create opportunities and transform lives.';

  /** Founder signature name */
  @Input() founderName = 'Yashvi Bagga';

  /** Founder role shown under the signature */
  @Input() founderRole = 'Founder';
}
