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
import { AbstractControl, FormControlStatus, FormGroup, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { ERROR_LABELS_TOKEN } from './error-labels.token';
import { ErrorLabelsConfig } from './error-labels.config';
import { combineLatestWith, distinctUntilChanged, Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    const controlName: string = this.controlName();
    const formGroup = this._formGroupDir?.form;
    if (!formGroup || !controlName) return;

    const ctrl: AbstractControl | null = formGroup.get(controlName);
    if (!ctrl) return;

    const formNameObs$: Observable<FormControlStatus> = ctrl.statusChanges.pipe(startWith(ctrl.status), distinctUntilChanged());
    const formGroupObs$: Observable<FormControlStatus> = formGroup.statusChanges.pipe(startWith(formGroup.status));

    if (!formNameObs$ || !formGroupObs$) return;

    formNameObs$.pipe(
      combineLatestWith(formGroupObs$),
      // distinctUntilChanged(([prevCtrl, prevGroup], [ctrl, group]) => {
      //   console.log('prev', prevCtrl, prevGroup, 'next', ctrl, group);
      //   return prevCtrl === prevGroup && ctrl === group;
      // }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(([_response1, _response2]) => {
      console.log('1', _response1, '2', _response2);
      // this.labelErrorText.set([]);
      // this.isValidFormName.set((ctrl?.invalid || this._formGroupDir?.invalid) ?? false)
      // if (ctrl?.errors || this._formGroupDir?.errors)  {
      //   let merge;
      //   if (this.showGroupError()) {
      //     merge = { ...ctrl.errors ?? {}, ...this._formGroupDir?.errors ?? {}}
      //   } else {
      //     merge = { ...ctrl.errors ?? {} }
      //   }
      //   this.labelErrorText.set(this._setLabelErrors(merge));
      // }
    })
  }

  private checkError(ctrl: AbstractControl) {
    if (ctrl?.errors) {
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
