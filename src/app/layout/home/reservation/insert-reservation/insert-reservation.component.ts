import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Constants} from "../../../../class/util/constants";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from '@angular/material/dialog';
import {CalendrierComponent} from '../../calendrier/calendrier.component';
import {Display} from '../../../../class/util/display';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoomService} from "../../../../service/room/room.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BaseService} from "../../../../service/base.service";
import {SheduleComponent} from "./result/shedule/shedule.component";


@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrls: ['./insert-reservation.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate(300)
      ]),
    ])
  ]
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
    photograph: 'false'
  };

  available: boolean = false;
  canShow: boolean = false;
  data: any;
  dataError: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar : MatSnackBar, private serve: BaseService) {}

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
    this.style = "";
    console.log(this.form);
    const date = this.form.date;
    const heureDebut = this.form.debut;
    const heureFin = this.form.fin;
    const id_salle = this.form.salle;
    const service = this.form.service;
    const nb = this.form.nombre;
    if(date){
      if(new Date(date)<new Date()){
        Display.alert(this.snackBar,'Date cannot be before today',"close",3000);
        return;
      }
    }
    if (heureDebut && heureFin) {
      const [debutheure, debutminute] = heureDebut.split(':').map(Number);
      const [finheure, finminute] = heureFin.split(':').map(Number);

      const now = new Date();
      const timeDebut = new Date(now.getFullYear(), now.getMonth(), now.getDate(), debutheure, debutminute);
      const timeFin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), finheure, finminute);

      if (timeFin < timeDebut) {
        Display.alert(this.snackBar, 'End hour cannot be before start hour', "close", 5000);
        return;
      }
    }
    if(nb){
      if(nb<=0){
        Display.alert(this.snackBar, 'Number of people should be greater than 0', "close", 5000);
        return;
      }
    }

    if(service == '') {
      Display.alert(this.snackBar , 'cannot check because service is not complete',"close",5000);
      return;
    }

    if (nb == '') {
      Display.alert(this.snackBar , 'Nombre personne cannot be incomplete',"close",5000);
      return;
    }

    if (date == '' || heureDebut == '' || heureFin == '') {
      Display.alert(this.snackBar , 'cannot check because interval hour is not complete',"close",5000);
      return;
    }

    if (id_salle == '') {
      Display.alert(this.snackBar , 'Room is not setted',"close",5000);
      return;
    }

    const info = {
      debut: this.getTimestamp(date, heureDebut),
      fin: this.getTimestamp(date, heureFin),
      id_salle: id_salle,
      id_service : service,
      nb_personne: nb
    };

    const url = Constants.BACK_URL + '/resa/available';
    this.http.post(url, info).subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        this.available = valiny.data.attributes.flag;
        this.canShow = true;
        if(this.available) {
          this.data = valiny.data.attributes;
        } else {
          const dtn = new Date(date);
          const message = (valiny.data.attributes.message)? valiny.data.attributes.message : 'Sorry! ' + dtn.toISOString() + ' [' + heureDebut + ' - ' + heureFin + '] is already reserved';
          this.dataError = {
            message: message
          };
        }

        this.scrollToBottom();
      },
      error: (err) => {
        Display.alert(this.snackBar , 'Internal Error, See log',"close",5000);
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

  style: string = "";

  confirm() {

    const clientS = this.form.clientS;
    const service = this.form.service;
    const date = this.form.date;
    const heureDebut = this.form.debut;
    const heureFin = this.form.fin;

    console.log(this.data)

    const info = {
      client: {id_client: clientS},
      service: {id_comp_service: service},
      heure_debut: this.getTimestamp(date, heureDebut),
      heure_fin: this.getTimestamp(date, heureFin),
      prix: this.data.prix,
      theme: this.data.theme,
      salle: this.data.theme.salle,
      nb_personne: this.form.nombre,
      photograph: this.form.photograph
    }

    this.serve.sendData(info, '/resa/save').subscribe({
      next: (valiny: any) => {
        this.style = "merged";
        console.log(valiny);
      },
      error: (err) => {
        Display.alert(this.snackBar , 'Internal Error, See log',"close",5000);
        console.error(err);
      }
    });
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  scrollDown(): void {
    window.scrollBy({
      top: 500,
      behavior: 'smooth'
    });
  }

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  shedule() {
    const dialogRef = this.dialog.open(SheduleComponent, {
      width: '900px',
      height: '500px',
      data: {date: this.form.date}
    });
  }

}
