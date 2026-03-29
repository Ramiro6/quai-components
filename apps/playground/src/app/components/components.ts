import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'playground-components',
  imports: [RouterOutlet],
  template: `
    <aside>
      de lado
    </aside>
    <router-outlet />
  `,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Components {}
