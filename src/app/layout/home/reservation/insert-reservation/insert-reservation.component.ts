import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReservationService} from "../../../../service/reservation/reservation.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrl: './insert-reservation.component.css'
})
export class InsertReservationComponent {
  form : FormGroup;
  constructor(private formBuilder : FormBuilder, private reservationService : ReservationService , private snackBar : MatSnackBar) {
    this.form = formBuilder.group({
      client : [''],
      service : [''],
      date_reservation : [''],
      date_reservee : [''],
      heure_debut : [''],
      heure_fin : ['']
    })
  }

  submitForm() {
    const data = {
      client : {
        id_client : this.form.get('client')?.value
      },
      service : {
        id_service : this.form.get('service')?.value
      },
      date_reservation : this.form.get('date_reservation')?.value,
      date_reservee : this.form.get('date_reservee')?.value,
      heure_debut : this.form.get('heure_debut')?.value,
      heure_fin : this.form.get('heure_fin')?.value
    };
    this.reservationService.save(data).subscribe({
      next:()=> {
        Display.alert(this.snackBar , "Sended Succesfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
  }
  
}
