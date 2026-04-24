import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


export interface QuaiTabInterface<T = Record<string, unknown>> {
  label: string;
  route?: string;
  data?: T;
}

@Component({
  selector: 'quai-tabs',
  template: `
    <div class="tabs__list" [class.tabs__list--divider]="divider()" role="tablist">
      @for(tab of tabs(); track $index) {
      <a
        class="tabs__tab"
        routerLinkActive="tabs__tab--active"
        [routerLink]="tab.route"
        role="tab"
      >
        {{ tab.label }}
      </a>
      }
    </div>
  `,
  styleUrl: './quai-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLinkActive, RouterLink],
})
export class QuaiTabs {
  readonly tabs = input<QuaiTabInterface[]>();
  readonly divider = input<boolean>(false);
}
