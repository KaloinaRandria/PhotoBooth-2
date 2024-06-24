import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../../../class/util/constants";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
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

  constructor(private http : HttpClient) {
  }

  ngOnInit() {
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
      }
    });
  }
}
