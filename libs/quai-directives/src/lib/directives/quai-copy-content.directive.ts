import { Directive, ElementRef, HostListener, inject, input, output } from '@angular/core';

@Directive({
  selector: '[quaiCopyContent]',
  standalone: true,
})
export class QuaiCopyContentDirective {
  readonly quaiCopyContent = input<string>();
  readonly copySuccess = output<boolean>();

  private el = inject(ElementRef<HTMLElement>);

  @HostListener('click', ['$event'])
  async onCopy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const textToCopy = this.quaiCopyContent() || this.el.nativeElement.textContent || '';

    try {
      await navigator.clipboard.writeText(textToCopy);
      this.updateButtonFeedback();
      this.copySuccess.emit(true);
    } catch {
      this.fallbackCopy(textToCopy);
      this.copySuccess.emit(true);
    }
  }

  private updateButtonFeedback() {
    const button = this.el.nativeElement as HTMLButtonElement;
    const originalText = button.textContent;

    button.textContent = 'Copied!';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }

  private fallbackCopy(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
    } catch (e) {
      console.error('Copy failed:', e);
    }

    document.body.removeChild(textarea);
  }
}
