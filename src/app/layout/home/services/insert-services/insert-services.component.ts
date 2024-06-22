import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ValueRangeService} from "../../../../service/valueRange/value-range.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ex} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-insert-services',
  templateUrl: './insert-services.component.html',
  styleUrl: './insert-services.component.css'
})
export class InsertServicesComponent implements OnInit {
  valueRange : any [] = [];
  ngOnInit() {
    this.getAllValueRange();
  }

  constructor(private valueRangeService : ValueRangeService , private snackBar : MatSnackBar) {
  }

  getAllValueRange() {
    const api = '/value/all';
    this.valueRangeService.getAll(api).subscribe({
      next : (response : any) => {
        if (response.succes) {
          this.valueRange = response.data;
        } else {
          Display.alert(this.snackBar , (response.message),"close",6000);
        }
      },
      error : (exception) => {
        Display.alert(this.snackBar , (exception.error.message),"close",6000);
      }
    });
  }
  submit() {

  }
}
