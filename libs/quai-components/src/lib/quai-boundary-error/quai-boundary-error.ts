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
import { AbstractControl, FormControlStatus, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { ERROR_LABELS_TOKEN } from './error-labels.token';
import { ErrorLabelsConfig } from './error-labels.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

type ErrorLabelsType = {
  uuid: string;
  id: number;
  label: string;
};

@Component({
  selector: 'quai-boundary-error',
  imports: [
  ],
  template: `
    <ng-content></ng-content>
    @if (isValidFormName() || isValidFormGroup()) {
      @for (errorLabel of labelErrorText(); track errorLabel.uuid) {
        <span>{{ errorLabel.label }}</span>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiBoundaryError implements OnInit {
  controlName: InputSignal<string> = input.required<string>();
  showGroupError: InputSignal<string> = input<string>('');
  private _formGroupDir: FormGroupDirective | null = inject(FormGroupDirective, {optional: true});
  private _errorLabels: ErrorLabelsConfig | null = inject(ERROR_LABELS_TOKEN, {optional: true});
  protected isValidFormName: WritableSignal<boolean | null> = signal<boolean | null>(false);
  protected isValidFormGroup: WritableSignal<boolean> = signal<boolean>(false);
  protected labelErrorText: WritableSignal<ErrorLabelsType[]> = signal<ErrorLabelsType[]>([]);
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    if (this.controlName() && this._formGroupDir?.form?.get(this.controlName())) {
      const ctrl: AbstractControl | null = this._formGroupDir.form.get(this.controlName());
      if (!ctrl) return;
      ctrl.statusChanges
        .pipe(
          switchMap(status => {
            return of(status);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (_value: FormControlStatus) => {
            this.isValidFormName.set(this._formIsValid(ctrl));
            this.checkError(ctrl);
          }
      });
    }

    if (this.showGroupError() &&  this._formGroupDir?.statusChanges) {
      this._formGroupDir.statusChanges
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (_value: FormControlStatus) => {
            this.isValidFormGroup.set(false);
            if (this._formGroupDir?.hasError(this.showGroupError()) && this._formGroupDir?.errors && this._formGroupDir?.invalid) {
              const labels: ErrorLabelsType[] = this._setLabelErrors(this._formGroupDir.errors);
              this.labelErrorText.update((prev: ErrorLabelsType[]) => {
                const checkIfExists = prev.find(item => item?.label === labels[0]?.label)
                if (checkIfExists) {
                  return prev;
                }
                return [...prev, ...labels ?? []];
              });
              this.isValidFormGroup.set(this._formGroupDir?.invalid)
            }
          }
      })
    }
  }

  private checkError(ctrl: AbstractControl) {
    if (this._errorLabels && ctrl?.errors) {
      this.labelErrorText.set(this._setLabelErrors(ctrl.errors));
    }
  }

  private _setLabelErrors(ctrl: ValidationErrors): ErrorLabelsType[] {
    return Object.keys(ctrl).map((key, index) => {
      const valueError = (this._errorLabels as ErrorLabelsConfig)[key]
      return { uuid: crypto.randomUUID(), id: index, label: valueError(ctrl) }
    });
  }

  private _formIsValid({ invalid, touched, dirty }: AbstractControl): boolean {
    return invalid && (touched || dirty)
  }
}
