import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuaiTabInterface, QuaiTabs } from '@quai/quai-components';

@Component({
  selector: 'playground-container-layout',
  imports: [RouterOutlet, QuaiTabs],
  template: `
    <quai-tabs [tabs]="tabs" />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerLayout {
  tabs: QuaiTabInterface[] = [
    { label: 'Overview', route: 'overview' },
    { label: 'API', route: 'api' },
    { label: 'Examples', route: 'example' },
  ];
}
