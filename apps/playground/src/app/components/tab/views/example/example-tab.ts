import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuaiTabInterface, QuaiTabs } from '@quai/quai-components';

@Component({
  selector: 'playground-example-tab',
  imports: [QuaiTabs],
  templateUrl: './example-tab.html',
  styles: `
    :host {
      display: block;
      padding: var(--quai-space-6);
    }

    .examples {
      display: flex;
      flex-direction: column;
      gap: var(--quai-space-8);
    }

    .example-label {
      font-size: var(--quai-text-xs);
      font-weight: var(--quai-font-semibold);
      color: var(--quai-color-text-muted);
      text-transform: uppercase;
      letter-spacing: var(--quai-tracking-wide);
      margin: 0 0 var(--quai-space-3);
    }

    .example-card {
      padding: var(--quai-space-6);
      border: 1px solid var(--quai-zinc-200);
      border-radius: var(--quai-radius-md);
      background: var(--quai-surface-2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleTab {
  basicTabs: QuaiTabInterface[] = [
    { label: 'First' },
    { label: 'Second' },
    { label: 'Third' },
  ];
}
