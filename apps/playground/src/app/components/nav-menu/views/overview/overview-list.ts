import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-overview-list',
  templateUrl: './overview-list.html',
  styles: `
    :host {
      display: block;
      padding: var(--quai-space-6);
    }

    .overview {
      display: flex;
      flex-direction: column;
      gap: var(--quai-space-6);
    }

    .code-block {
      padding: var(--quai-space-4);
      background: var(--quai-surface-1);
      border: 1px solid var(--quai-zinc-200);
      border-radius: var(--quai-radius-md);
      font-size: var(--quai-text-sm);
      overflow-x: auto;
    }

    code {
      font-family: 'Geist Mono', ui-monospace, monospace;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewList {}
