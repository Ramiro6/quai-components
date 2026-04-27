import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuaiNavMenu, QuaiNavMenuInterface } from '@quai/quai-components';

@Component({
  selector: 'playground-example-list',
  imports: [QuaiNavMenu],
  templateUrl: './example-list.html',
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
      display: flex;
      flex-direction: column;
      gap: var(--quai-space-4);
      padding: var(--quai-space-6);
      border: 1px solid var(--quai-zinc-200);
      border-radius: var(--quai-radius-md);
      background: var(--quai-surface-2);
      max-width: 16rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleList {
  list: QuaiNavMenuInterface[] = [
    {
      label: 'Dashboard',
    },
    {
      label: 'Settings',
    },
  ];
  listChild: QuaiNavMenuInterface[] = [
    {
      label: 'Main',
      item: [
        {
          label: 'Dashboard',
        },
        {
          label: 'Analytics',
        },
      ],
    },
    {
      label: 'Management',
      item: [
        {
          label: 'Users',
        },
        {
          label: 'Settings',
        },
      ],
    },
  ];
}
