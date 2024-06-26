import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";
import { PopUpConfirmationComponent } from './pop-up-confirmation/pop-up-confirmation.component';
import {Constants} from "../../../../class/util/constants";
import {Display} from "../../../../class/util/display";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Navigation} from "../../../../class/util/navigation"; // Importez le plugin dayGrid


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.css'
})
export class ListReservationComponent implements OnInit{
  constructor(private dialog: MatDialog, private http: HttpClient, private snackbar: MatSnackBar) {
  }

  initialReservations: any[] = [];
  reservations: any[] = [];
  services: any[] = [];
  ngOnInit() {
    this.getAllReservation();
    this.loadServices();
  }

  popUp() {

    const dialogRef = this.dialog.open(PopUpComponent, {
      data: {}
    });

  }

  popUpConfirm(resa: any) {
    if(resa.confirmed) {
      Display.alert(this.snackbar ,'Already confirmed',"close",3000);
      return;
    }

    const dialogRef = this.dialog.open(PopUpConfirmationComponent, {
      data: {price: resa.prix}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmResa(resa);
      }
    });
  }

  page: number = 1;
  maxPage: number = 1;

  next() {
    this.page = this.page + 1;
    this.reservations = Navigation.paginate(this.initialReservations, this.page);
  }

  previous() {
    this.page = this.page - 1;
    this.reservations = Navigation.paginate(this.initialReservations, this.page);
  }

  confirmResa(resa: any) {
    this.http.put(Constants.BACK_URL + '/resa/confirm/' + resa.id_reservation, null).subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        resa.confirmed = true;
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackbar , (err.error.message),"close",6000);
      }
    });
  }

  getAllReservation() {
    this.http.get(Constants.BACK_URL + '/resa/all').subscribe({
      next: (valiny: any) => {
        this.initialReservations = valiny.data;
        this.reservations = Navigation.paginate(this.initialReservations, this.page);
        this.maxPage = Navigation.maxPage(this.initialReservations);
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackbar , (err.error.message),"close",6000);
      }
    });
  }

  cancel(resa: any) {
    if(resa.confirmed) {
      Display.alert(this.snackbar ,'Already confirmed',"close",3000);
      return;
    }

    this.http.put(Constants.BACK_URL + '/resa/cancel/' + resa.id_reservation, null).subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        if (valiny.success) {
          Display.alert(this.snackbar , "Canceled Successfully","close",3000,"succes-snackbar");
        } else {
          Display.alert(this.snackbar , valiny.message,"close",3000);
        }
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackbar , (err.error.message),"close",3000);
      }
    });
  }

  loadServices() {
    this.http.get(Constants.BACK_URL + '/service/all').subscribe({
      next: (valiny: any) => {
        this.services = valiny.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filter: any = {
    clientS: '',
    service: '',
    reservationDateMin: '',
    reservationDateMax: '',
    reservedDateMin: '',
    reservedDateMax: '',
    start: '',
    end: '',
    minPrice: '',
    maxPrice: ''
  }

  extractTime(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  filterStaff(
    resaList: any[],
    filter: any
  ): any[] {
    return resaList.filter(resa => {
      const price = resa.prix;
      const matchesClient = filter.clientS && filter.clientS !== '' ? resa.client.nom.toLowerCase().includes(filter.clientS.toLowerCase()) : true;
      const matchesPriceMin = filter.minPrice && filter.minPrice !== '' ? price >= Number(filter.minPrice) : true;
      const matchesPriceMax = filter.maxPrice && filter.maxPrice !== '' ? price <= Number(filter.maxPrice) : true;

      let matchesServIntitule = true;
      if (filter.service && filter.service !== '') {
        matchesServIntitule = resa.service.id_comp_service.toLowerCase().includes(filter.service.toLowerCase());
      }

      let matchesReservationStartDate = true;
      let matchesReservationEndDate = true;

      if (filter.reservationDateMin && filter.reservationDateMin !== '') {
        matchesReservationStartDate = new Date(resa.date_reservation) >= new Date(filter.reservationDateMin);
      }

      if (filter.reservationDateMax && filter.reservationDateMax !== '') {
        matchesReservationEndDate = new Date(resa.date_reservation) <= new Date(filter.reservationDateMax);
      }

      let matchesReservedStartDate = true;
      let matchesReservedEndDate = true;

      if (filter.reservedDateMin && filter.reservedDateMin !== '') {
        matchesReservedStartDate = new Date(resa.date_reservee) >= new Date(filter.reservedDateMin);
      }

      if (filter.reservedDateMax && filter.reservedDateMax !== '') {
        matchesReservedEndDate = new Date(resa.date_reservee) <= new Date(filter.reservedDateMax);
      }

      const debut = this.extractTime(resa.heure_debut);
      const fin = this.extractTime(resa.heure_debut);

      let matchesStartDate = true;
      let matchesEndDate = true;

      if (filter.start && filter.start !== '') {
        matchesStartDate = debut >= filter.start;
      }

      if (filter.end && filter.end !== '') {
        matchesEndDate = fin <= filter.end;
      }

      return (
        matchesClient &&
        matchesPriceMin &&
        matchesPriceMax &&
        matchesServIntitule &&
        matchesReservationEndDate &&
        matchesReservationStartDate &&
        matchesStartDate &&
        matchesEndDate &&
        matchesReservedStartDate &&
        matchesReservedEndDate
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterStaff(this.initialReservations, this.filter);
    this.reservations = filterTab;
  }

  initial() {
    this.reservations = this.initialReservations;
  }

  extractDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de 0
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
