import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../service/category/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../../../class/util/display";
import {Component} from "@angular/core";

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrl: './insert-category.component.css'
})
export class InsertCategoryComponent {

  form: FormGroup;

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.form = formBuilder.group({
      intitule: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      const data = {
        intitule: this.form.get('intitule')?.value
      };

      this.categoryService.save(data, "/categ/save").subscribe({
        next: () => {
          Display.alert(this.snackBar, "Successfully inserted", "Close", 3000, "succes-snackbar");
        },
        error: (exception) => {
          Display.alert(this.snackBar, exception.error.message, "Close", 6000);
        }
      });
    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
