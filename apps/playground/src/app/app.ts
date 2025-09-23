import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// import { QuaiBoundaryError } from '@quai/quai-components';

@Component({
  imports: [RouterModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
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
