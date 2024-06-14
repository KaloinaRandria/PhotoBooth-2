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
      
    };
  }
}
