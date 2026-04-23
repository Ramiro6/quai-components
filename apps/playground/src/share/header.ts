import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../app/components/theme-switcher/theme-switcher';

@Component({
  selector: 'playground-header',
  imports: [ThemeSwitcherComponent],
  template: `
    <div class="header-content">
      <h1>Quai Design System</h1>
      <app-theme-switcher></app-theme-switcher>
    </div>
  `,
  styles: `
    :host {
      padding-inline: var(--quai-space-6);
      background: var(--quai-surface-2);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--quai-space-6);
    }

    h1 {
      font-size: var(--quai-text-xl);
      font-weight: var(--quai-font-semibold);
      color: var(--quai-color-primary);
      margin: 0;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
