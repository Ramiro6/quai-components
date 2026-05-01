import { ChangeDetectionStrategy, Component, contentChild, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'quai-codeblock',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './quai-codeblock.html',
  styleUrl: './quai-codeblock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiCodeBlockComponent {
  readonly title = input<string>();
  readonly header = contentChild<TemplateRef<any>>('header');
  readonly content = contentChild<TemplateRef<any>>('body');
}
