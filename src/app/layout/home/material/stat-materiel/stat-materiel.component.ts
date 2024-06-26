import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import { Constants } from '../../../../class/util/constants';
Chart.register(...registerables);

@Component({
  selector: 'app-stat-materiel',
  templateUrl: './stat-materiel.component.html',
  styleUrl: './stat-materiel.component.css'
})
export class StatMaterielComponent implements OnInit{
  baseChart: any = {
    data: [],
    labels: []
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getChartData();
    this.getMatStat();
  }

  getChartData() {
    this.http.get(Constants.BACK_URL + '/materiel/stat').subscribe({
      next:(valiny: any)=> {
        this.baseChart.data = valiny.data.data;
        this.baseChart.labels = valiny.data.labels;

        this.renderChart(this.baseChart);
      },
      error:(err) => {
        console.error(err);
      }
    });
  }

  chiffre: number = 0;
  getMatStat() {
    this.http.get(Constants.BACK_URL + '/stat/mat').subscribe({
      next:(valiny: any)=> {
        this.chiffre = valiny.data.total;
      },
      error:(err) => {
        console.error(err);
      }
    });
  }

  renderChart(chartData: any) {
  new Chart("piechart", {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'materiel',
        data: chartData.data,
        backgroundColor: [
          '#261d15d9'
        ],
        borderColor: [
          '#261d15'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });}
}
