import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect, ElementRef,
  viewChild
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

        <quai-codeblock>
          <ng-template #header>
            <div
              class="row justify-end"
              [quaiCopyContent]="refContentBlock()"
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
          </ng-template>

          <ng-template #body>
            <span #ref content> console.log('holaaaa') </span>
          </ng-template>

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
  readonly contentBlock = viewChild<ElementRef>('ref');
  readonly refContentBlock = computed<string>(
    () => this.contentBlock()?.nativeElement?.textContent ?? ''
  );
}
