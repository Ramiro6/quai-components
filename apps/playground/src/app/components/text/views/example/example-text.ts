import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuaiText } from '@quai/quai-components';

@Component({
  selector: 'playground-example-text',
  imports: [QuaiText],
  template: `
    <div class="examples">
      <div class="example">
        <h3>Text Sizes</h3>
        <quai-text level="xs">Extra small text</quai-text><br /><br />
        <quai-text level="sm">Small text</quai-text><br /><br />
        <quai-text level="base">Base text (default)</quai-text><br /><br />
        <quai-text level="lg">Large text</quai-text><br /><br />
        <quai-text level="xl">Extra large text</quai-text><br /><br />
        <quai-text level="2xl">2XL text</quai-text>
      </div>

      <div class="example">
        <h3>Muted Text</h3>
        <quai-text>Regular text</quai-text><br /><br />
        <quai-text [muted]="true">Muted text</quai-text><br /><br />
        <quai-text level="lg" [muted]="true">Large muted text</quai-text>
      </div>
    </div>
  `,
  styles: `
    .examples {
      display: flex;
      gap: var(--quai-space-10);
      padding: var(--quai-space-6);
    }

    .example {
      flex: 1;
      padding: var(--quai-space-6);
      border-radius: var(--quai-radius-md);
      background: var(--quai-surface-1);
    }

    h3 {
      margin: 0 0 var(--quai-space-6) 0;
      font-size: var(--quai-text-lg);
      color: var(--quai-color-primary);
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleText {}
