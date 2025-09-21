import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuaiBoundaryError } from '../../../../libs/quai-components/src/lib/quai-boundary-error/quai-boundary-error';

@Component({
  imports: [RouterModule, ReactiveFormsModule, QuaiBoundaryError],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'playground';
  private fb: FormBuilder = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  });

  handleSubmit() {
    console.log('submit');
  }
}
