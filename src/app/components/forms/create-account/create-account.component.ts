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

  // verifica que el usuario se ha enviado con exito antes de mostrar el user.
  formSubmittedSuccessfully = false;

  addUser() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.registredUsers.push({
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        passwordConfirmation: this.registerForm.value.passwordConfirmation!,
      });
      this.formSubmittedSuccessfully = true; // Se establece en true solo cuando el formulario es válido y se añade un usuario
      this.registerForm.reset(); // Reiniciar el formulario
      this.submitted = false;
    }
    // No restablecer formSubmittedSuccessfully a false aquí
  }
}
