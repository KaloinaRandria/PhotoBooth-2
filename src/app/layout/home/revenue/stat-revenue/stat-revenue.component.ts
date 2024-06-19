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
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Cyan', 'Magenta', 'Lime', 'Pink'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 8, 14, 6, 9],
          backgroundColor: 'rgba(21,9,1,0.5)', // couleur avec transparence
          borderColor: 'rgb(21,9,1)',
          borderWidth: 1
        }]
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
