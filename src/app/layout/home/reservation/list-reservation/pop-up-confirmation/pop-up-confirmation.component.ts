import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-confirmation',
  templateUrl: './pop-up-confirmation.component.html',
  styleUrl: './pop-up-confirmation.component.css'
})
export class PopUpConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<PopUpConfirmationComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false); // Return false on cancel
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Return true on confirmation

  }
}
