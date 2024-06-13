import { Component } from '@angular/core';
import {CategoryService} from "../../../../service/category/category.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrl: './insert-category.component.css'
})
export class InsertCategoryComponent {

  form : FormGroup;
  constructor(private categoryService: CategoryService,private formBilder:FormBuilder,private snackBar : MatSnackBar) {
    this.form = formBilder.group({
      intitule : ['']
    })
  }
  submitForm(){
    const data={
      intitule : this.form.get('intitule')?.value
    };
    this.categoryService.save(data,"/categ/save").subscribe({
      next:()=>{
        Display.alert(this.snackBar,"Sended successfully","close",3000,"succes-snackbar");
      },
      error:(exception)=>{
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    })
  }


}
