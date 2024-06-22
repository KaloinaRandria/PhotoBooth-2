import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {Constants} from "../../../../class/util/constants";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-stat-revenue',
  templateUrl: './stat-revenue.component.html',
  styleUrl: './stat-revenue.component.css'
})
export class StatRevenueComponent implements OnInit {
  ngOnInit() {
    this.loadData();
  }

  constructor(private  http: HttpClient, private snackbar: MatSnackBar) {
  }
  renderChart(info: any) {
    new Chart("linechart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Profit',
            data: info.benefice,
            backgroundColor: 'rgb(55,213,14)', // couleur avec transparence
            borderColor: 'rgb(55,213,14)',
            borderWidth: 1
          },
          {
            label: 'Expense',
            data: info.depense,
            backgroundColor: 'rgb(220,18,18)', // couleur avec transparence
            borderColor: 'rgb(220,18,18)',
            borderWidth: 1
          },
          {
            label: 'Revenue',
            data: info.chiffre,
            backgroundColor: 'rgb(19,26,157)', // couleur avec transparence
            borderColor: 'rgb(19,26,157)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: {
              padding: 20 // Augmenter l'espace entre les labels de l'axe x
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2, // Ajuste l'intervalle entre les valeurs des ticks
              padding: 20 // Augmenter l'espace entre les labels de l'axe y
            }
          }
        }
      }
    });
  }

  loadData() {
    this.http.get(Constants.BACK_URL + '/stat/financial/2024').subscribe({
      next:(valiny: any)=> {
        const info = valiny.data.attributes;
        this.renderChart(info);
        console.log(valiny);
      },
      error:(err) => {
        console.error(err);
      }
    });
  }
}
