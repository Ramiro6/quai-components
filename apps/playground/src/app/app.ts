import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuaiComponents } from '@quai/quai-components';

@Component({
  imports: [RouterModule, QuaiComponents],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'playground';
}
