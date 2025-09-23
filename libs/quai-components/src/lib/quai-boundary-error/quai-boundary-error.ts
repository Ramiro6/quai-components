import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { AbstractControl, FormControlStatus, FormGroupDirective } from '@angular/forms';
import { ERROR_LABELS_TOKEN } from './error-labels.token';
import { ErrorLabelsConfig } from './error-labels.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type ErrorLabelsType = {
  id: number;
  label: string;
};

@Component({
  selector: 'quai-boundary-error',
  imports: [],
  template: `
    <ng-content></ng-content>
    @if (isValidForm()) {
      @for (errorLabel of labelErrorText(); track errorLabel.id) {
        <span>{{ errorLabel.label }}</span>
      }
    }
  `,
  styles: ``,
  // viewProviders: [{
  //   provide: ControlContainer,
  //   useFactory: () => inject(ControlContainer, { skipSelf: true }),
  // }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiBoundaryError implements OnInit {
  controlName: InputSignal<string> = input.required<string>();
  showGroupError: InputSignal<unknown> = input<unknown>();
  private _formGroupDir: FormGroupDirective | null = inject(FormGroupDirective, {optional: true});
  private _errorLabels: ErrorLabelsConfig | null = inject(ERROR_LABELS_TOKEN, {optional: true});
  protected isValidForm: WritableSignal<boolean> = signal<boolean>(false);
  protected labelErrorText: WritableSignal<ErrorLabelsType[]> = signal<ErrorLabelsType[]>([]);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    if (this.controlName() && this._formGroupDir?.form?.get(this.controlName())) {
      const ctrl: AbstractControl | null = this._formGroupDir.form.get(this.controlName());
      if (!ctrl) return;
      ctrl.statusChanges
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (_value: FormControlStatus) => {
            this.isValidForm.set(this._formIsValid(ctrl))
            this.checkError(ctrl);
          }
      })

    }
  }

  private checkError(ctrl: AbstractControl) {
    if (this._errorLabels && ctrl?.errors) {
      const allErrorLabels = Object.keys(ctrl.errors).map((key, index) => {
        const valueError = (this._errorLabels as ErrorLabelsConfig)[key]
        return { id: index, label: valueError(ctrl?.errors) }
      });

      this.labelErrorText.set(allErrorLabels);
    }
  }

  private _formIsValid({invalid, touched, dirty}: AbstractControl): boolean {
    return invalid && (touched || dirty);
  }
}
