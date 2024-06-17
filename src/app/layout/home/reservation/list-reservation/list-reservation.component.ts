import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.css'
})
export class ListReservationComponent {
  constructor(private dialog: MatDialog) {
  }

  popUp() {

    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '100vh',
      height:'90vh',
      data: {}
    });

  }
}
