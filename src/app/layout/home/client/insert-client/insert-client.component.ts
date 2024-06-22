import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from "../../../../service/client/client.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Display } from "../../../../class/util/display";

@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrls: ['./insert-client.component.css']
})
export class InsertClientComponent {
  form: FormGroup;

  constructor(private fBuilder: FormBuilder, private clientService: ClientService, private snackBar: MatSnackBar) {
    this.form = fBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      dtn: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required, Validators.pattern('^\\d{2} \\d{2} \\d{3} \\d{2}$')]]
    });
  }

  submitForm() {
    console.log(this.form.valid)
    if (this.form.valid) {
      const data = {
        nom: this.form.get('nom')?.value,
        prenom: this.form.get('prenom')?.value,
        email: this.form.get('mail')?.value,
        num_telephone: this.form.get('numero')?.value,
        date_de_naissance: this.form.get('dtn')?.value,
      };

      this.clientService.formulaireSend(data).subscribe({
        next: () => {
          Display.alert(this.snackBar, "Sent Successfully", "close", 3000, "success-snackbar");
        },
        error: (exception) => {
          console.error(exception);
          Display.alert(this.snackBar, 'Error', "close", 6000);
        }
      });
    } else {
      Display.alert(this.snackBar, 'Please fill all required fields correctly', "close", 6000);
    }
  }
}
