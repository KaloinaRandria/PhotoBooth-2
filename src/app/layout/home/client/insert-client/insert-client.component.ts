import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClientService} from "../../../../service/client/client.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../../../class/util/display";

@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.css'
})
export class InsertClientComponent {
  form : FormGroup;
  constructor(private fBuilder : FormBuilder , private clientService : ClientService , private snackBar : MatSnackBar) {
    this.form = fBuilder.group({
      prenom : [''],
      nom : [''],
      dtn : [''],
      mail : [''],
      numero : [''],

    })
  }

  submitForm() {
    const data = {
      nom : this.form.get('nom')?.value,
      prenom : this.form.get('prenom')?.value,
      email : this.form.get('mail')?.value,
      num_telephone : this.form.get('numero')?.value
    };
    console.log(data);
    this.clientService.formulaireSend(data).subscribe({
       next:()=> {
        Display.alert(this.snackBar , "Sended Succesfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
  }
}
