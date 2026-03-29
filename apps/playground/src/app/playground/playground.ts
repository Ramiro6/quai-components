import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rq-playground',
  imports: [],
  template: `<p>playground works!</p>`,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playground {}
