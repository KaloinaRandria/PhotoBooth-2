import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecordService} from "../../../../service/record/record.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../../../class/util/display";

@Component({
  selector: 'app-insert-record',
  templateUrl: './insert-record.component.html',
  styleUrl: './insert-record.component.css'
})
export class InsertRecordComponent {
  form:FormGroup;
  constructor(private recordService:RecordService,private formBuilder:FormBuilder,private snackBar:MatSnackBar) {
    this.form=formBuilder.group({
        label:['',Validators.required],
        amount:['',[Validators.required,Validators.min(0)]],
        date:['',Validators.required]
    });
  }
  submit() {
    if(this.form.valid){
      const data={
        libele:this.form.get('label')?.value,
        montant:this.form.get('amount')?.value,
        date_insertion:this.form.get('date')?.value
      }
      console.log(data);
      this.recordService.save(data,'/depense/save').subscribe({
        next: () => {
          Display.alert(this.snackBar, "Envoyé avec succès", "Fermer", 3000, "success-snackbar");
        },
        error: (exception) => {
          Display.alert(this.snackBar, exception.error.message, "Fermer", 6000);
        }
      });
    }
    else{
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }
}
