import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../../service/base.service';
import { Display } from '../../../../class/util/display';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-material',
  templateUrl: './insert-material.component.html',
  styleUrl: './insert-material.component.css'
})
export class InsertMaterialComponent implements OnInit {
  ngOnInit(): void {
      
  }

  constructor(private service: BaseService, private alert: MatSnackBar) {

  }

  form: any = {
    intitule: '',
    quantite: '',
    prix: '',
    prix_achat: ''
  }

  submit() {

    const ver = this.verifiate(this.form);
    if(!ver) {
      Display.alert(this.alert,'complete all input',"close",3000);
      return;
    }

    this.service.sendData(this.form, '/materiel/save').subscribe({
      next:(response:any) => {
        Display.alert(this.alert,"Sended successfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.alert,'Error',"close",6000);
        console.error(exception);
      }
    });
  }

  private verifiate(info: any): boolean {
    return !Object.values(info).some(value => 
      value === null || 
      value === undefined || 
      (typeof value === 'string' && value.trim() === '')
    );
  }
}
