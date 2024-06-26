import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../class/util/constants";
import {Display} from "../../../../class/util/display";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profit-revenue',
  templateUrl: './profit-revenue.component.html',
  styleUrl: './profit-revenue.component.css'
})
export class ProfitRevenueComponent implements OnInit {
  showEstimation = false;
  categories = ['Category A', 'Category B', 'Category C']; // Exemple de

  result: any;
  loading: boolean = true;

  prevoirMoisProchain() {
    this.predict();
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  predict() {
    this.loading = true;
    this.http.get(Constants.BACK_URL + '/predict/nextMonth').subscribe({
      next:(response:any) => {
        console.log(response);
        this.result = response.data;
        this.loading = false;
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
        console.error(exception);
        this.loading = false;
      }
    });
  }
}
