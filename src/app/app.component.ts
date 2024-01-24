import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './components/forms/create-account/create-account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, CreateAccountComponent],
})
export class AppComponent {
  title = 'Login forms';
}
