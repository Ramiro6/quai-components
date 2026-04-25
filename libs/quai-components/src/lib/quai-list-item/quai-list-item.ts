import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'quai-list-item',
  template: `
    <li class="list__item">
      <ng-content />
    </li>
  `,
  styleUrl: './quai-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiListItem {}
