import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rq-start',
  template: `
    <section>
      <button routerLink="/playground">playground</button>
      <button routerLink="/components">components</button>
    </section>
  `,
  styles: `
    section {
      height: 100%;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class Start {}
