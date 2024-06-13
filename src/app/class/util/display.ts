import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

export class Display {
  static alert(snackBar: MatSnackBar, message: string, action: string, duration: number, className?: string) {
    const config: MatSnackBarConfig<any> = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'error-snackbar'
    }

    if (className) {
      config['panelClass'] = className;
    }
    snackBar.open(message, action, config);
  }
}
