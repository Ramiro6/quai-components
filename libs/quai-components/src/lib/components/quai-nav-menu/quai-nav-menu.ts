import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface QuaiNavMenuInterface {
  label: string;
  item?: QuaiNavMenuItemInterface[];
  routerLink?: string;
  [key: string]: any;
}

export interface QuaiNavMenuItemInterface {
  label?: string;
  icon?: string;
  routerLink?: string;
  [key: string]: any;
}

@Component({
  selector: 'quai-nav-menu',
  templateUrl: './quai-nav-menu.html',
  styleUrl: './quai-nav-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class QuaiNavMenu {
  readonly list = input.required<QuaiNavMenuInterface[]>();
}
