import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export function dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    return { 'invalidDate': true };
  }
  return null;
}

export function positiveNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value <= 0) {
      return { 'invalidNumber': true };
    }
    return null;
  }
  
  export function atLeastOneCheckboxSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        const isAtLeastOneCheckboxSelected = control.controls.some(ctrl => ctrl.value);
        return isAtLeastOneCheckboxSelected ? null : { 'nonSelection': true };
      }
      return null;
    };
  }