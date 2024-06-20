import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const debutControl = formGroup.get('debut');
    const finControl = formGroup.get('fin');

    if (debutControl && finControl && debutControl.value && finControl.value) {
      const debut = new Date(debutControl.value);
      const fin = new Date(finControl.value);

      if (debut > fin) {
        finControl.setErrors({ dateRange: true });
        return { dateRange: true };
      } else {
        finControl.setErrors(null);
        return null;
      }
    }

    return null;
  };
}
