import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Aside } from '../../share/aside';

@Component({
  selector: 'playground-components-container',
  imports: [RouterOutlet, Aside, RouterLink, RouterLinkActive],
  template: `
    <playground-aside>
      <ul>
        <li>
          <a
            routerLink="buttons"
            routerLinkActive="is-active"
            >Buttons</a
          >
        </li>
      </ul>
    </playground-aside>
    <main>
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: 18rem 1fr;
      height: 100%;
      background: var(--quai-color-bg);
    }

    main {
      padding: var(--quai-space-2) var(--quai-space-8);
      background: var(--quai-surface-0);
      overflow-y: auto;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsContainer {}
