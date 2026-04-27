import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-overview-codeblock',
  templateUrl: './overview-codeblock.html',
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

    h2 {
      font-size: var(--quai-text-2xl);
      font-weight: var(--quai-font-bold);
      margin: 0;
    }

    h3 {
      font-size: var(--quai-text-lg);
      font-weight: var(--quai-font-bold);
      margin: 0;
    }

    p {
      margin: 0;
      color: var(--quai-color-text-secondary);
      font-size: var(--quai-text-base);
    }

    ul {
      margin: 0;
      padding-left: var(--quai-space-6);
      display: flex;
      flex-direction: column;
      gap: var(--quai-space-3);
    }

    li {
      color: var(--quai-color-text-secondary);
      font-size: var(--quai-text-base);
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewCodeblock {}
