import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { QuaiThemeService } from '@quai/quai-components';

/**
 * Example theme switcher component.
 * Demonstrates dynamic theme switching using QuaiThemeService.
 */
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher">
      <label>Theme:</label>
<!--      <div class="theme-buttons">-->
<!--        <button-->
<!--          *ngFor="let theme of availableThemes"-->
<!--          (click)="setTheme(theme)"-->
<!--          [class.active]="theme === activeTheme"-->
<!--          class="theme-btn"-->
<!--        >-->
<!--          {{ theme | titlecase }}-->
<!--        </button>-->
<!--      </div>-->
<!--      <span class="active-label">Active: {{ activeTheme }}</span>-->
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .theme-switcher {
      display: flex;
      align-items: center;
      gap: var(--quai-space-4);
      padding: var(--quai-space-4);
      border: 1px solid var(--quai-color-border);
      border-radius: var(--quai-radius-md);
      background: var(--quai-surface-1);
    }

    label {
      font-weight: var(--quai-font-semibold);
      color: var(--quai-color-text-secondary);
    }

    .theme-buttons {
      display: flex;
      gap: var(--quai-space-2);
    }

    .theme-btn {
      padding: var(--quai-space-2) var(--quai-space-3);
      border: 1px solid var(--quai-color-border);
      border-radius: var(--quai-radius-sm);
      background: var(--quai-surface-2);
      color: var(--quai-color-text);
      font-size: var(--quai-text-sm);
      cursor: pointer;
      transition: all 200ms ease;

      &:hover {
        background: var(--quai-accent-subtle);
        border-color: var(--quai-accent);
      }

      &.active {
        background: var(--quai-color-primary);
        color: var(--quai-color-primary-foreground);
        border-color: var(--quai-color-primary);
      }

      &:focus-visible {
        outline: 2px solid var(--quai-accent);
        outline-offset: 2px;
      }
    }

    .active-label {
      margin-left: auto;
      font-size: var(--quai-text-sm);
      color: var(--quai-color-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  // private themeService = inject(QuaiThemeService);
  //
  // availableThemes = this.themeService.getAvailableThemes();
  // activeTheme = this.themeService.getActiveThemeName();
  //
  // setTheme(themeName: string): void {
  //   this.themeService.switchTheme(themeName);
  //   this.activeTheme = this.themeService.getActiveThemeName();
  // }
}
