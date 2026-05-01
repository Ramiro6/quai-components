import { Directive, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[quaiCopyContent]',
  standalone: true,
  host: { '(click)': 'onCopy($event)' },
})
export class QuaiCopyContentDirective {
  private _currentCopy = false;
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
      if (this._currentCopy) return;
      navigator.clipboard
        .writeText(textClip)
        .then(() => {
          this._currentCopy = true;
          this.copySuccess.emit(this._currentCopy);

          this.copySuccessWithTime.emit(this._currentCopy);
          setTimeout(() => {
            this._currentCopy = false;
            this.copySuccessWithTime.emit(this._currentCopy);
          }, this.time());
        })
        .catch((error) => {
          this._currentCopy = false;
          console.error('Error copying text: ', error);
        });
    }
  }
}
