import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseService} from "../../../../../service/base.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Display} from "../../../../../class/util/display";

@Component({
  selector: 'app-modify-client',
  templateUrl: './modify-client.component.html',
  styleUrl: './modify-client.component.css'
})
export class ModifyClientComponent {
  client: any = undefined;
  constructor(
      private snackBar : MatSnackBar,
      private service : BaseService,
      public dialogRef: MatDialogRef<ModifyClientComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.client = data.client;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.service.updateData(this.client, '/client/update').subscribe({
      next:()=> {
        Display.alert(this.snackBar , "updated Succesfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
  }
}
