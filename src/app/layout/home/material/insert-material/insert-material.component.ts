import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../../../../service/base.service';
import { Display } from '../../../../class/util/display';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-material',
  templateUrl: './insert-material.component.html',
  styleUrls: ['./insert-material.component.css']
})
export class InsertMaterialComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: BaseService, private alert: MatSnackBar) {
    this.form = this.formBuilder.group({
      intitule: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0)]],
      prix: ['', [Validators.required, Validators.min(0)]],
      prix_achat: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void { }

  submit() {
    if (this.form.invalid) {
      Display.alert(this.alert, 'Complete all inputs correctly', 'close', 3000);
      return;
    }

    this.service.sendData(this.form.value, '/materiel/save').subscribe({
      next: (response: any) => {
        Display.alert(this.alert, "Sended successfully", "close", 3000, "success-snackbar");
      },
      error: (exception) => {
        Display.alert(this.alert, 'Error', "close", 6000);
        console.error(exception);
      }
    });
  }
}
