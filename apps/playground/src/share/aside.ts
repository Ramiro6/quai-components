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
      padding: var(--quai-spacing-lg);
      border-right: 1px solid var(--quai-color-border);
      background: var(--quai-color-bg-secondary);
    }

    .nav-title {
      font-family: var(--quai-font-display);
      font-size: var(--quai-font-size-xs);
      font-weight: var(--quai-font-weight-bold);
      color: var(--quai-color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--quai-spacing-md);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--quai-spacing-xs);
    }

    a {
      display: block;
      padding: 0.5em 0.75em;
      border-radius: var(--quai-radius-md);
      color: var(--quai-color-text-secondary);
      text-decoration: none;
      font-size: var(--quai-font-size-sm);
      transition: color 0.2s ease, background 0.2s ease;

      &:hover {
        color: var(--quai-color-text);
        background: var(--quai-color-surface);
      }

      &.is-active {
        color: var(--quai-color-primary);
        background: var(--quai-color-surface);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aside {}
