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

  /**
   * * formulario de registro
   * * Validación de los campos de formularios (email, password & confirm password)
   * * implementamos custom validators en share/custom-validations.ts
   */

  registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
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

  /* El constructor de la clase del componente inyecta FormBuilder, un servicio de Angular que proporciona una forma más sencilla de crear formularios reactivos. */
  constructor(private formBuilder: FormBuilder) {}

  /* verificación [class.is-invalid] de bootstrap. Una variable booleana utilizada para rastrear si el formulario ha sido enviado. Esto ayuda a controlar la visualización de los mensajes de validación */
  submitted = false;

  /* Array guardar usuarios regisrados. Un array que almacena los usuarios registrados. Cada vez que un usuario se registra con éxito, sus detalles se añaden a este array. */
  registredUsers: User[] = [];

  /* verifica que el usuario se ha enviado con exito antes de mostrar el user. Una variable booleana que se usa para rastrear si el formulario se ha enviado con éxito. Se utiliza para controlar la visualización de la lista de usuarios registrados. */
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

/**
       * Este método se llama cuando se envía el formulario.
        this.submitted = true; indica que se ha intentado enviar el formulario.
       - if (this.registerForm.valid) { ... } verifica si el formulario es válido.
       - Dentro del if, se añade un nuevo usuario al array registredUsers con los valores del formulario.
       - this.formSubmittedSuccessfully = true; se establece en true para indicar que el formulario se ha enviado correctamente.
       - this.registerForm.reset(); reinicia el formulario, borrando los campos de entrada.
       - this.submitted = false; restablece la variable submitted para futuros envíos del formulario.
      */
