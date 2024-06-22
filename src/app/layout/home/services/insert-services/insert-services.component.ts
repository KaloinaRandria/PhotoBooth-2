import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValueRangeService} from "../../../../service/valueRange/value-range.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ex} from "@fullcalendar/core/internal-common";
import { Constants } from '../../../../class/util/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insert-services',
  templateUrl: './insert-services.component.html',
  styleUrl: './insert-services.component.css'
})
export class InsertServicesComponent implements OnInit {
  valueRange : any [] = [];
  form : FormGroup;
  ngOnInit() {
    this.getAllValueRange();
  }
  
  price: any[] = [];
  formulaire : any = {
    label : '',
    icon : ''
  };

  constructor(private http : HttpClient ,private fBuilder : FormBuilder,private valueRangeService : ValueRangeService , private snackBar : MatSnackBar) {
    this.form = fBuilder.group({
      label : ['', Validators.required]
    })
  }

  getAllValueRange() {
    const api = '/tarif/all';
    this.valueRangeService.getAll(api).subscribe({
      next : (response : any) => {
        this.valueRange = response.data;
        for (let i = 0; i < this.valueRange.length; i++) {
          this.valueRange[i].price = 0;
        }

      },
      error : (exception) => {
        Display.alert(this.snackBar , (exception.error.message),"close",6000);
        console.log(exception);
      }
    });
  }
  submitForm() {
   console.log(this.valueRange );
   console.log(this.formulaire);

   const info = {
     icon : this.formulaire.icon,
     label: this.formulaire.label,
     valueRange : this.valueRange
   };
   const api = Constants.BACK_URL + '/service/new'
   this.http.post(api,info).subscribe({
     next:() => {
       Display.alert(this.snackBar,"Sent Succesfully","close",3000);
     },
     error:(exception) => {
       Display.alert(this.snackBar,"Error","close",6000);
     }
   });
  } 
}
