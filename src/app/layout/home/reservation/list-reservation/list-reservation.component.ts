import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";
import { PopUpConfirmationComponent } from './pop-up-confirmation/pop-up-confirmation.component'; // Importez le plugin dayGrid


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.css'
})
export class ListReservationComponent {
  constructor(private dialog: MatDialog) {
  }

  isConfirmed: boolean = false;

  popUp() {

    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '100vh',
      height:'90vh',
      data: {}
    });

  }

  popUpConfirm() {
    const dialogRef = this.dialog.open(PopUpConfirmationComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isConfirmed = true;
      }
    });
  }
}
