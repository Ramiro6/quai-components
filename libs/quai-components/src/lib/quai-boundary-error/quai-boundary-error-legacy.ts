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
import { combineLatestWith, iif, map, Observable, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

type ErrorLabelsType = {
  uuid: string;
  id: number;
  label: string;
};

@Component({
  selector: 'quai-boundary-error-legacy',
  imports: [],
  template: `
    <ng-content></ng-content>
    @if (isValidFormName()) {
      @for (errorLabel of labelErrorText(); track errorLabel.uuid) {
        <span>{{ errorLabel.label }}</span>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiBoundaryErrorLegacy implements OnInit {
  controlName: InputSignal<string> = input.required<string>();
  showGroupError: InputSignal<string> = input<string>('');
  private _formGroupDir: FormGroupDirective | null = inject(FormGroupDirective, {optional: true});
  private _errorLabels: ErrorLabelsConfig | null = inject(ERROR_LABELS_TOKEN, {optional: true});
  protected isValidFormName: WritableSignal<boolean | null> = signal<boolean | null>(false);
  protected labelErrorText: WritableSignal<ErrorLabelsType[]> = signal<ErrorLabelsType[]>([]);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private _inputObsChange$: Observable<string> = toObservable(this.showGroupError);

  ngOnInit() {
    const controlName: string = this.controlName();
    const formGroup = this._formGroupDir?.form;
    if (!formGroup || !controlName) return;

    const ctrl: AbstractControl | null = formGroup.get(controlName);
    if (!ctrl) return;

    const formNameObs$: Observable<FormControlStatus> = ctrl.statusChanges.pipe(startWith(ctrl.status));
    const formGroupObs$: Observable<FormControlStatus> = formGroup.statusChanges.pipe(startWith(formGroup.status));

    if (!formNameObs$ || !formGroupObs$) return;

    const combineNameObs$ = formNameObs$.pipe(map(item => [null, item]));

    const combineObs$ = formNameObs$.pipe(
      combineLatestWith(formGroupObs$),
    );

    this._inputObsChange$.pipe(
      switchMap((changeInput) => iif(() => changeInput.length > 0, combineObs$, combineNameObs$)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: ([_responseGroup, _responseName]) => {
        this.labelErrorText.set([]);
        this.isValidFormName.set(this._formIsValid(ctrl));
        if (ctrl?.errors || this._formGroupDir?.errors)  {
          let merge;
          if (this.showGroupError()) {
            merge = { ...ctrl.errors ?? {}, ...this._formGroupDir?.errors ?? {}}
          } else {
            merge = { ...ctrl.errors ?? {} }
          }
          this.labelErrorText.set(this._setLabelErrors(merge));
        }
      }
    })
  }

  private _setLabelErrors(ctrl: ValidationErrors): ErrorLabelsType[] {
    return Object.keys(ctrl).map((key, index) => {
      const valueError = (this._errorLabels as ErrorLabelsConfig)[key]
      return { uuid: crypto.randomUUID(), id: index, label: valueError(ctrl) }
    });
  }

  private _formIsValid({ invalid, touched, dirty }: AbstractControl): boolean {
    return (invalid || this._formGroupDir?.invalid) && dirty || touched
  }
}
