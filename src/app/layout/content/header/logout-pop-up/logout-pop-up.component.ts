import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout-pop-up',
  templateUrl: './logout-pop-up.component.html',
  styleUrl: './logout-pop-up.component.css'
})
export class LogoutPopUpComponent {

  constructor(public dialogRef: MatDialogRef<LogoutPopUpComponent>) { }
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
