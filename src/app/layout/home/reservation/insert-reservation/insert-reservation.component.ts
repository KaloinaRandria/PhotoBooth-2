import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { Constants } from "../../../../class/util/constants";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { CalendrierComponent } from '../../calendrier/calendrier.component';
import { Display } from '../../../../class/util/display';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../../../../service/base.service';
import {RoomService} from "../../../../service/room/room.service";


@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrls: ['./insert-reservation.component.css'] // Correction ici
})
export class InsertReservationComponent implements OnInit {
  searchControl = new FormControl();
  options: any[] = [];
  services: any[] = [];
  salles: any[] = [];
  filteredOptions: Observable<any[]> | undefined;

  form: any = {
    clientS: '',
    service: '',
    salle: '',
    date: '',
    debut: '',
    fin: '',
    nombre: '',
    photograph: ''
  };

  available: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar : MatSnackBar, private roomService: RoomService) {}

  ngOnInit() {
    this.getAllClient();
    this.getAllService();
    this.getAllSalle();
    // Initialisation de filteredOptions déplacée ici pour s'assurer que options est mis à jour
    this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOptions(value))
    );
  }

  private _filterOptions(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }

  getAllClient() {
    this.http.get(Constants.BACK_URL + '/client/all').subscribe({
      next: (valiny: any) => {
        console.log('Clients retrieved:', valiny); // Ajouter un log pour vérifier les données
        this.options = this.createOptions(valiny.data);
        // Mise à jour de filteredOptions après avoir mis à jour les options
        this.filteredOptions = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterOptions(value))
        );
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  createOptions(data: any) {
    const options = [];
    for (let i = 0; i < data.length; i++) {
      options.push({ value: data[i].id_client, viewValue: data[i].nom + ' ' + data[i].prenom });
    }
    return options;
  }

  getAllService() {
    this.http.get(Constants.BACK_URL + '/service/all').subscribe({
      next: (valiny: any) => {
        this.services = valiny.data;
        console.log(this.services);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getAllSalle() {
    this.http.get(Constants.BACK_URL + '/salle/all').subscribe({
      next: (valiny: any) => {
        this.salles = valiny.data;
        console.log(this.salles);
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackBar , (err.error.message),"close",6000);
      }
    });
  }

  submit() {
    console.log(this.form);
  }

  check() {
    console.log(this.form);
    const date = this.form.date;
    const heureDebut = this.form.debut;
    const heureFin = this.form.fin;

    if (date == '' || heureDebut == '' || heureFin == '') {
      Display.alert(this.snackBar , 'cannot check because interval hour is not complete',"close",5000);
      return
    }

    const info = {
      debut: this.getTimestamp(date, heureDebut),
      fin: this.getTimestamp(date, heureFin)
    };

    const url = Constants.BACK_URL + '/resa/available';
    this.http.post(url, info).subscribe({
      next: (valiny: any) => {

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  calendar() {
    const dialogRef = this.dialog.open(CalendrierComponent, {
      width: '900px',
      height: '500px',
      data: {vue: 'timeGridWeek'}
    });
  }

  getTimestamp(dt: string, heure: string): string {
    let date = new Date(dt);
    let [hours, minutes] = heure.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    return date.toISOString();
  }
}
