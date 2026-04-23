import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-aside',
  imports: [],
  template: `
    <nav>
      <p class="nav-title">Components</p>
      <ng-content></ng-content>
    </nav>
  `,
  styles: `
    :host {
      display: block;
      padding: var(--quai-space-6);
      border-right: var(--quai-color-border);
      background: var(--quai-surface-1);
    }

    .nav-title {
      font-family: var(--quai-font-family);
      font-size: var(--quai-text-xs);
      font-weight: var(--quai-font-semibold);
      color: var(--quai-color-text-secondary);
      text-transform: uppercase;
      letter-spacing: var(--quai-tracking-wide);
      margin-bottom: var(--quai-space-4);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--quai-space-1);
    }

    a {
      display: block;
      padding: 0.5em 0.75em;
      border-radius: var(--quai-radius-md);
      color: var(--quai-color-text-secondary);
      text-decoration: none;
      font-size: var(--quai-text-sm);
      transition: color 0.2s ease, background 0.2s ease;

      &:hover {
        color: var(--quai-color-text);
        background: var(--quai-surface-2);
      }

      &.is-active {
        color: var(--quai-color-primary);
        background: var(--quai-surface-2);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aside {}
