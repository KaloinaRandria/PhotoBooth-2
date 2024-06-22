import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-stat-revenue',
  templateUrl: './stat-revenue.component.html',
  styleUrl: './stat-revenue.component.css'
})
export class StatRevenueComponent implements OnInit {
  ngOnInit() {
    this.renderChart();
  }
  renderChart() {
    new Chart("linechart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Profit',
            data: [12, 19, 3, 5, 2, 3, 8, 14, 6, 9, 10, 15],
            backgroundColor: 'rgb(55,213,14)', // couleur avec transparence
            borderColor: 'rgb(55,213,14)',
            borderWidth: 1
          },
          {
            label: 'Expense',
            data: [8, 14, 6, 9, 10, 15, 12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(220,18,18)', // couleur avec transparence
            borderColor: 'rgb(220,18,18)',
            borderWidth: 1
          },
          {
            label: 'Revenue',
            data: [15, 10, 12, 9, 5, 8, 14, 6, 19, 3, 2, 3],
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
}
