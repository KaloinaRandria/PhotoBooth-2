import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { PopUpEditRecordComponent } from './pop-up-edit-record/pop-up-edit-record.component';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrl: './list-record.component.css'
})
export class ListRecordComponent {
  insertedReservations = [
    { room: 'Room 1', startTime: '09:00', endTime: '11:00', amount: '$100' },
    { room: 'Room 2', startTime: '13:00', endTime: '15:00', amount: '$150' },
    // Autres réservations insérées...
  ];

  constructor(private dialog: MatDialog) {
  }
  popUp() {

    const dialogRef = this.dialog.open(PopUpEditRecordComponent, {
      data: {}
    });

  }

  filter() {
    // Logique pour filtrer les réservations en fonction des critères spécifiés
    console.log('Filtering reservations...');
    // Implémentez votre propre logique de filtrage ici
  }

  editReservation(reservation: any) {
    // Logique pour l'édition de la réservation
    console.log('Editing reservation:', reservation);
    // Implémentez votre propre logique d'édition ici
  }

  deleteReservation(reservation: any) {
    // Logique pour la suppression de la réservation
    console.log('Deleting reservation:', reservation);
    // Implémentez votre propre logique de suppression ici
  }
}
