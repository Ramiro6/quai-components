import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-example-button',
  imports: [],
  template: `<section>
    <h2 class="texto">Example</h2>
    <p>buttons</p>
  </section>`,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleButton {}
