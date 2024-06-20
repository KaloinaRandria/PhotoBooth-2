import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../../../../service/base.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Display } from '../../../../../class/util/display';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  staff: any  =undefined;
  roleList: any[] = [];
  posteList: any[] = [];

  constructor(
    private snackBar : MatSnackBar,
    private service : BaseService,
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.staff = data.staff;
    this.roleList = data.roleList;
    this.posteList = data.posteList;
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.service.updateData(this.staff, '/membre/update').subscribe({
      next:()=> {
        Display.alert(this.snackBar , "updated Succesfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
  }
}
