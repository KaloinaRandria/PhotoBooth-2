import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.css'
})
export class InsertClientComponent {
  form : FormGroup;
  constructor(private fBuilder : FormBuilder) {
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
    this
  }
}
