import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-header',
  imports: [],
  template: ``,
  styles: `
    :host {
      padding: var(--quai-spacing-lg) var(--quai-spacing-lg);
      border-bottom: 1px solid var(--quai-color-surface);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--quai-color-surface);
      z-index: 2;
    }

  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
