import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'playground-container-text',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerText {}
