import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'quai-list',
  template: `
    @for(item of list(); track $index) {
    <span class="list__group-label">{{ item?.title }}</span>

    @if (item?.child) { @for(child of item?.child; track $index) {
      <ng-content></ng-content>
    } } }
  `,
  styleUrl: './quai-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiList {
  readonly list = input<any[]>();
}
