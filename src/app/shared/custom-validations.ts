import {
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

export class CustomValidators extends Validators {
  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
  }

  static mustBeEqual(
    nameFirstControl: string,
    nameSecondControl: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const firstControl = group.get(nameFirstControl);
      const secondControl = group.get(nameSecondControl);
      return firstControl?.value === secondControl?.value
        ? null
        : { mustBeEqual: true };
    };
  }

  static atLeastOneNumber(control: AbstractControl): ValidationErrors | null {
    return /\d+/.test(control.value) ? null : { toNumber: true };
  }

  static atLeastOneUppercase(
    control: AbstractControl
  ): ValidationErrors | null {
    return /[A-Z]+/.test(control.value) ? null : { atLeastOneUppercase: true };
  }

  static atLeastOneLowercase(
    control: AbstractControl
  ): ValidationErrors | null {
    return /[a-z]+/.test(control.value) ? null : { atLeastOneLowercase: true };
  }

  static mustBeDifferent(firstField: string, secondField: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const firstControl = group.get(firstField);
      const secondControl = group.get(secondField);
      return firstControl?.value != secondControl?.value
        ? null
        : { mustBeDifferent: true };
    };
  }
}
