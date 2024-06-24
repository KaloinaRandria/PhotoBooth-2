import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../../../class/util/constants";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../../../class/util/display";
import {MatSelectChange} from "@angular/material/select";
Chart.register(...registerables);

@Component({
  selector: 'app-statistics-client',
  templateUrl: './statistics-client.component.html',
  styleUrl: './statistics-client.component.css'
})
export class StatisticsClientComponent implements OnInit {
  filteredOptions: Observable<any[]> | undefined;
  searchControl = new FormControl();
  options: any[] = [];
  topClient: any[] = [];
  clientId= '';
  canDisplay = false;

  constructor(private http : HttpClient, private alert: MatSnackBar) {
  }

  ngOnInit() {
    this.getTopClient();
    this.getAllClient();
    this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOptions(value))
    );
  }

  private _filterOptions(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }

  createOptions(data: any) {
    const options = [];
    for (let i = 0; i < data.length; i++) {
      options.push({ value: data[i].id_client, viewValue: data[i].nom + ' ' + data[i].prenom });
    }
    return options;
  }

  getAllClient() {
    this.http.get(Constants.BACK_URL + '/client/all').subscribe({
      next: (valiny: any) => {
        this.options = this.createOptions(valiny.data);
        this.filteredOptions = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterOptions(value))
        );
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.alert , "Error", "close", 3000);
      }
    });
  }

  getTopClient() {
    this.http.get(Constants.BACK_URL + '/stat/client/top/3').subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        this.topClient = valiny.data;
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.alert , "Error", "close", 3000);
      }
    });
  }

  update(event: MatSelectChange) {
    this.loadClient(event.value);
  }

  selectedClient: any = undefined;

  loadClient(id: string) {
    this.http.get(Constants.BACK_URL + '/stat/client/' + id).subscribe({
      next: (valiny: any) => {
        this.selectedClient = valiny.data.attributes;
        console.log(this.selectedClient);
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.alert , "Error", "close", 3000);
      }
    });
  }
}
