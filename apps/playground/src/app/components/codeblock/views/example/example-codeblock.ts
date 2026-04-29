import {
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChild,
} from '@angular/core';
import { QuaiCodeBlockComponent } from '@quai/quai-components';
import { QuaiCopyContentDirective } from '@quai/quai-directives';

@Component({
  selector: 'playground-example-codeblock',
  imports: [QuaiCodeBlockComponent, QuaiCopyContentDirective],
  template: `
    <div class="demo-content">
      <h2 class="demo-heading">Code Block</h2>
      <p class="demo-subtext">
        Display code snippets with language labels and copy-to-clipboard
        functionality.
      </p>

      <div class="stack-v gap-6">
        <!-- header -->
        <!-- content-->
        <quai-codeblock>
          <div
            class="row justify-end"
            header
            [quaiCopyContent]="''"
            [time]="1000"
            (copySuccessWithTime)="copyText = !copyText"
          >
            <button
              class="row justify-end"
              type="button"
              aria-label="Copy code"
            >
              @if (copyText) { Copy! } @else { Copy }
            </button>
          </div>

          <ng-container #ref content> console.log('holaaaa') </ng-container>
          <!--          <span class="codeblock__lang">{{ title() }}</span>-->
          <!--TODO change this button later-->
          <!--          <button class="codeblock__copy" type="button" aria-label="Copy code">-->
          <!--            Copy-->
          <!--          </button>-->
        </quai-codeblock>
      </div>
    </div>
  `,
  styleUrl: './example-codeblock.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleCodeblock {
  copyText = false;
  contentBlock = viewChild('ref');
  refContentBlock = computed(
    () => this.contentBlock() ?? ''
  );
}
