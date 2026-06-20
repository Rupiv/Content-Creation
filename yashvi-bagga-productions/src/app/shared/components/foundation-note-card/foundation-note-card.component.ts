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
    'YASHVI BAGGA PRODUCTIONS was founded with the belief that creativity has the power to inspire, influence and transform businesses, brands and individuals.',
    'What started as a passion for meaningful content evolved into a platform that brings together talent, storytelling, innovation and strategic marketing under one roof.',
    'We believe every brand has a story worth telling, every creator deserves an opportunity to shine, and every campaign should leave a lasting impact.',
  ];

  /** Founder quote rendered in the highlighted block */
  @Input() quote =
    'I dedicate this venture to every dreamer who believes that creativity can create opportunities and transform lives.';

  /** Founder signature name */
  @Input() founderName = 'Yashvi Bagga';

  /** Founder role shown under the signature */
  @Input() founderRole = 'Founder';
}
