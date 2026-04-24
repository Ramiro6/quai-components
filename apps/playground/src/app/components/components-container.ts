import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuaiSidebar } from '@quai/quai-components';
import { QuaiHeader } from '@quai/quai-components';

@Component({
  selector: 'playground-components-container',
  imports: [
    RouterOutlet,
    QuaiSidebar,
    RouterLink,
    RouterLinkActive,
    QuaiHeader,
  ],
  template: `
    <quai-sidebar>
      <a
        class="sidebar__link"
        routerLink="buttons/example"
        routerLinkActive="sidebar__link--active"
        [routerLinkActiveOptions]="{ exact: false }"
        >Buttons</a
      >
      <a
        class="sidebar__link"
        routerLink="text/example"
        routerLinkActive="sidebar__link--active"
        [routerLinkActiveOptions]="{ exact: false }"
        >Text</a
      >
      <a
        class="sidebar__link"
        routerLink="tab/example"
        routerLinkActive="sidebar__link--active"
        [routerLinkActiveOptions]="{ exact: false }"
        >Tabs</a
      >
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
export class ComponentsContainer {}
