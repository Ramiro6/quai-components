import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  FormControlStatus,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'quai-boundary-error',
  imports: [],
  template: `
    <ng-content></ng-content>
    <!--    {{ _formGroupDir?.form?.get(controlName())?.valid }}-->
    <!--    @if (fatherForm()?.invalid && (fatherForm()?.touched || fatherForm()?.dirty)) {-->
    <!--      <small>seuuuu</small>-->
    <!--    }-->
    <!--    @if (getControlFormName()?.invalid && (getControlFormName()?.touched || getControlFormName()?.dirty)) {-->
    <!--      <small>is required</small>-->
    <!--    }-->
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuaiBoundaryError implements OnInit {
  controlName: InputSignal<string> = input.required<string>();
  public _formGroupDir: FormGroupDirective | null = inject(FormGroupDirective, {
    optional: true,
  });
  private _stateFormControlNameChange: WritableSignal<FormControlStatus> =
    signal('INVALID');
  protected fatherForm: WritableSignal<AbstractControl | null> = signal(null);

  constructor() {
    effect(() => {
      console.log('change', this._stateFormControlNameChange());
    });
  }

  ngOnInit() {
    if (
      this.controlName() &&
      this._formGroupDir?.form?.get(this.controlName())
    ) {
      this._formGroupDir?.form.get(this.controlName());
      this.fatherForm.set(this._formGroupDir?.form.get(this.controlName()));
      this._formGroupDir?.form
        .get(this.controlName())
        ?.statusChanges.subscribe({
          next: (value: FormControlStatus) =>
            this._stateFormControlNameChange.set(value),
        });
    }
  }
}
