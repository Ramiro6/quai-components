import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-api-codeblock',
  templateUrl: './api-codeblock.html',
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

    section {
      display: flex;
      flex-direction: column;
      gap: var(--quai-space-4);
    }

    h3 {
      font-size: var(--quai-text-xl);
      font-weight: var(--quai-font-bold);
      margin: 0;
    }

    h4 {
      font-size: var(--quai-text-lg);
      font-weight: var(--quai-font-bold);
      margin: 0;
    }

    p {
      margin: 0;
      color: var(--quai-color-text-secondary);
      font-size: var(--quai-text-sm);
    }

    .code-block {
      padding: var(--quai-space-4);
      background: var(--quai-surface-1);
      border: 1px solid var(--quai-border-default-color);
      border-radius: var(--quai-radius-md);
      font-size: var(--quai-text-sm);
      overflow-x: auto;
    }

    code {
      font-family: 'Geist Mono', ui-monospace, monospace;
      color: var(--quai-color-text);
      font-size: var(--quai-text-xs);
    }

    .api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--quai-text-sm);
    }

    .api-table th {
      text-align: left;
      padding: var(--quai-space-3) var(--quai-space-4);
      border-bottom: 1px solid var(--quai-border-default-color);
      color: var(--quai-color-text-muted);
      font-weight: var(--quai-font-medium);
      background: var(--quai-surface-1);
    }

    .api-table td {
      padding: var(--quai-space-3) var(--quai-space-4);
      border-bottom: 1px solid var(--quai-border-default-color);
      color: var(--quai-color-text-secondary);
    }

    .api-table code {
      background: var(--quai-surface-2);
      padding: 0.125em 0.375em;
      border-radius: var(--quai-radius-sm);
      color: var(--quai-color-text);
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiCodeblock {}
