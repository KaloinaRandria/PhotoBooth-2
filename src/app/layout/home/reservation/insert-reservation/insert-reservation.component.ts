import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { Constants } from "../../../../class/util/constants";
import { HttpClient } from "@angular/common/http";

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
    fin: ''
  };

  available: boolean = false;

  constructor(private http: HttpClient) {}

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
      }
    });
  }

  submit() {
    console.log(this.form);
  }

  check() {
    console.log(this.form);
  }
}
