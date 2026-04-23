import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type TextLevel = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'quai-text',
  imports: [],
  templateUrl: './quai-text.html',
  styleUrl: './quai-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class QuaiText {
  level = input<TextLevel>('base');
  muted = input<boolean>(false);
}

