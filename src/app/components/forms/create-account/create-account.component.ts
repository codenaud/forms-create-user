// create-account-component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../../shared/custom-validations';

interface User {
  email: string;
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  // verificación contraseña
  hidePasswordConfirmation: boolean = true;
  hidePassword: boolean = true;

  // verificación estilos de bootstrap
  submitted = false;
  // Array guardar usuarios regisrados
  registredUsers: User[] = [];

  registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]], // Añade Validators.email aquí
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.onlyNumbers,
        ],
      ],
      passwordConfirmation: ['', Validators.required],
    },
    {
      validators: CustomValidators.mustBeEqual(
        'password',
        'passwordConfirmation'
      ),
    }
  );

  constructor(private formBuilder: FormBuilder) {}

  addUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const newUser: User = {
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        passwordConfirmation: this.registerForm.value.passwordConfirmation!,
      };
      this.registredUsers.push(newUser);
      this.registerForm.reset();
      this.submitted = false;
    }
  }
}
