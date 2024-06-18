import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrl: './insert-reservation.component.css'
})
export class InsertReservationComponent {
  myControl = new FormControl();
  searchControl = new FormControl();
  options = [
    { value: 'option1', viewValue: 'Noob' },
    { value: 'option2', viewValue: 'Tonny' },
    { value: 'option3', viewValue: 'Bryan' },
  ];
  filteredOptions: Observable<any[]>;

  constructor() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOptions(value))
    );
  }

  private _filterOptions(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }
}
