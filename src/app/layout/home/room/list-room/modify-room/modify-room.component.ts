import {Component, Inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseService} from "../../../../../service/base.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Display} from "../../../../../class/util/display";

@Component({
  selector: 'app-modify-room',
  templateUrl: './modify-room.component.html',
  styleUrl: './modify-room.component.css'
})
export class ModifyRoomComponent {
  room: any = undefined;
  constructor(
      private snackBar : MatSnackBar,
      private service : BaseService,
      public dialogRef: MatDialogRef<ModifyRoomComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.room = data.room;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.service.updateData(this.room, '/salle/update').subscribe({
      next:()=> {
        Display.alert(this.snackBar , "updated Succesfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
  }
}
