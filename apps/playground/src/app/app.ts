import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { QuaiBoundaryErrorLegacy } from '@quai/quai-components';

@Component({
  imports: [RouterModule, ReactiveFormsModule, QuaiBoundaryErrorLegacy],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'playground';
  private fb: FormBuilder = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required ]],
  }, {
    validators: [this.passwordsMatchValidator],
  });

  handleSubmit() {
    console.log('submit');
  }


  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('repeatPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

}
