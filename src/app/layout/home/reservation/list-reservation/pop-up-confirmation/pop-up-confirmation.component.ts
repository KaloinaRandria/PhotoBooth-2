import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-confirmation',
  templateUrl: './pop-up-confirmation.component.html',
  styleUrl: './pop-up-confirmation.component.css'
})
export class PopUpConfirmationComponent {
  prix: number = 0;
  constructor(public dialogRef: MatDialogRef<PopUpConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
  {
    console.log(data);
    this.prix = data.price;
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false on cancel
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Return true on confirmation

  }
}
