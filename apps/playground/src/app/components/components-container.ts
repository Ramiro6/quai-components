import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  QuaiSidebar,
  QuaiNavMenu,
  QuaiNavMenuInterface,
} from '@quai/quai-components';
import { QuaiHeader } from '@quai/quai-components';

@Component({
  selector: 'playground-components-container',
  imports: [RouterOutlet, QuaiSidebar, QuaiHeader, QuaiNavMenu],
  template: `
    <quai-sidebar>
      <quai-nav-menu [list]="menuItems"></quai-nav-menu>
    </quai-sidebar>
    <section>
      <quai-header>
        <span brand>Quai Design System</span>
      </quai-header>
      <main>
        <router-outlet />
      </main>
    </section>
  `,
  styles: `
    :host {
      background: var(--quai-color-bg);
      display: grid;
      grid-template-columns: var(--quai-sidebar-width) 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "aside main";
      height: 100dvh;
    }

    section {
      grid-area: main;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    quai-sidebar {
      grid-area: aside;
    }


    main {
      flex: 1;
      padding: var(--quai-space-2) var(--quai-space-8);
      background: var(--quai-surface-0);
      overflow-y: auto;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsContainer {
  menuItems: QuaiNavMenuInterface[] = [
    {
      label: 'Components',
      item: [
        { label: 'Buttons', routerLink: 'buttons' },
        { label: 'Codeblock', routerLink: 'codeblock' },
        { label: 'Text', routerLink: 'text' },
        { label: 'Tabs', routerLink: 'tab' },
        { label: 'Nav Menu', routerLink: 'nav-menu' },
      ],
    },
    {
      label: 'Layout',
      item: [
        { label: 'Grid & Spacing', routerLink: 'layout' },
      ],
    },
  ];
}
