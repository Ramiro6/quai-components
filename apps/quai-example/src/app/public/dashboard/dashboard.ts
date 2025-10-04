import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'exa-dashboard',
  imports: [
    RouterOutlet
  ],
  template: `
    <h1>Dashboard</h1>
    <router-outlet></router-outlet>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
