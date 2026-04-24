import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'quai-sidebar',
  imports: [],
  template: `
    <nav class="sidebar__nav">
      <span class="sidebar__group-label">Components</span>
      <div class="sidebar__group">
        <ng-content></ng-content>
      </div>
    </nav>
  `,
  styleUrl: './quai-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiSidebar {}
