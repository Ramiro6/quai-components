import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-api-text',
  templateUrl: './api-text.html',
  styles: `
    :host {
      display: block;
      padding: var(--quai-space-6);
    }

    .api {
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

    .api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--quai-text-sm);
    }

    .api-table th {
      text-align: left;
      padding: var(--quai-space-3) var(--quai-space-4);
      border-bottom: 1px solid var(--quai-zinc-200);
      color: var(--quai-color-text-muted);
      font-weight: var(--quai-font-medium);
    }

    .api-table td {
      padding: var(--quai-space-3) var(--quai-space-4);
      border-bottom: 1px solid var(--quai-zinc-200);
    }

    .api-table code {
      font-size: var(--quai-text-xs);
      background: var(--quai-surface-1);
      padding: 0.125em 0.375em;
      border-radius: var(--quai-radius-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiText {}
