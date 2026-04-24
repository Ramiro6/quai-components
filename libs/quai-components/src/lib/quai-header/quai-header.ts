import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'quai-header',
  imports: [],
  template: `
    <div class="header__brand">
      <ng-content select="[brand]"></ng-content>
    </div>
    <div class="header__content">
      <ng-content></ng-content>
    </div>
    <div class="header__actions">
      <ng-content select="[actions]"></ng-content>
    </div>
  `,
  styleUrl: './quai-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiHeader {}
