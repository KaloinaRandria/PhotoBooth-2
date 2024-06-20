import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeRangeValidator(startKey: string, endKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startControl = formGroup.get(startKey);
    const endControl = formGroup.get(endKey);

    if (!startControl || !endControl) {
      return null;
    }

    const start = startControl.value;
    const end = endControl.value;

    if (start && end && start >= end) {
      endControl.setErrors({ timeRange: true });
      return { timeRange: true };
    } else {
      endControl.setErrors(null);
      return null;
    }
  };
}
