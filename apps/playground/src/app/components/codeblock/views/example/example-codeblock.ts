import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuaiCodeBlockComponent } from '@quai/quai-components';

@Component({
  selector: 'playground-example-codeblock',
  imports: [QuaiCodeBlockComponent],
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
          <ng-container header>
            <button class="col-12" type="button" aria-label="Copy code">
              Copy
            </button>
            <button class="col-12" type="button" aria-label="Copy code">
              Copy
            </button>
            <button class="col-12" type="button" aria-label="Copy code">
              Copy
            </button>
          </ng-container>

          <ng-container content> console.log('holaaaa') </ng-container>
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
export class ExampleCodeblock {}
