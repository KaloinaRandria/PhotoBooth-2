import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from '../../../../../service/base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../../class/util/display';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  materiel: any = undefined;
  form: any = {
    quantite : ''
  }
  

  constructor(
    private alert: MatSnackBar,
    private service: BaseService,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.materiel = data.item;
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
  add() {
    console.log(this.form);
    if (this.form.quantite === '') {
      return;
    }

    const info = {
      id_materiel: this.materiel.id_materiel,
      last_quantite: this.materiel.quantite,
      new_quantite: this.form.quantite
    }

  
    this.service.sendData(info, '/materiel/add').subscribe({
      next:(response:any) => {
        Display.alert(this.alert,"Sended successfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.alert,(exception.error.message),"close",6000);
        console.log(exception);
      }
    });
  }
}
