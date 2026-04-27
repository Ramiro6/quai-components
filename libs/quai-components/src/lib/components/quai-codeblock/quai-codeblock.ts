import { ChangeDetectionStrategy, Component, viewChild, ElementRef, input, effect, computed } from '@angular/core';

@Component({
  selector: 'quai-codeblock',
  standalone: true,
  templateUrl: './quai-codeblock.html',
  styleUrl: './quai-codeblock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiCodeBlockComponent {
  readonly title = input<string>();
  readonly contentCode = viewChild<ElementRef>('ref');
  readonly contentCp = computed(() => this.contentCode()?.nativeElement?.textContent)
}
