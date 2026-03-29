import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'playground-example-button',
  imports: [],
  template: `<p>Example button</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleButton {
}
