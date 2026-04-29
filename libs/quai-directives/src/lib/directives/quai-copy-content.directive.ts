import { Directive, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[quaiCopyContent]',
  standalone: true,
  host: { '(click)': 'onCopy($event)' },
})
export class QuaiCopyContentDirective {
  readonly quaiCopyContent = input<string>();
  readonly time = input<number>(2000);
  readonly copySuccess = output<boolean>();
  readonly copySuccessWithTime = output<boolean>();

  private el = inject(ElementRef<HTMLElement>);

  onCopy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.quaiCopyContent()) {
      const textClip = this.quaiCopyContent() as string;
      navigator.clipboard
        .writeText(textClip)
        .then(() => {
          const currentCopy = true;
          this.copySuccess.emit(currentCopy);

          this.copySuccessWithTime.emit(currentCopy);
          setTimeout(() => {
            this.copySuccessWithTime.emit(!currentCopy);
          }, this.time());
        })
        .catch((error) => {
          console.error('Error copying text: ', error);
        });
    }
  }
}
