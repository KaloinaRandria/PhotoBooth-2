import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../../../../service/base.service';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Display } from '../../../../../class/util/display';

@Component({
  selector: 'app-modift-theme',
  templateUrl: './modift-theme.component.html',
  styleUrl: './modift-theme.component.css'
})
export class ModiftThemeComponent {
  theme : any = undefined;
  constructor(private snackBar : MatSnackBar,
              private service  : BaseService,
              private dialogRef : MatDialogRef<ModiftThemeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.theme = data.theme;
  }
  onNoClick() {
    this.dialogRef.close();
  }

  update() {
    this.service.updateData(this.theme,'/theme/update').subscribe({
      next:() => {
        Display.alert(this.snackBar, "updated SuccessFully","close",6000);        
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
  }
}
