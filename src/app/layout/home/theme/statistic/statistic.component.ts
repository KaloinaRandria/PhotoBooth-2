import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from "chart.js";
import {Constants} from "../../../../class/util/constants";
import {Display} from "../../../../class/util/display";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
Chart.register(...registerables);

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit {

  ngOnInit(): void {
    this.loadthemes();
  }

  themes: any[] = [];
  initialThemes: any[] = [];

  activeTheme: any = {
    intitule: '',
    categorie_theme: {intitule: ''},
    gain: 0,
    usedCount: 0,
  };
  currentIndex = 0;
  taille: number = 0;
  chart: Chart | null = null;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
  }

  renderChart(info: any) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("piechart", {
    type: 'bar',
    data: {
      labels: info.labels,
      datasets: [{
        label: "Theme par service",
        data: info.data,
        backgroundColor: info.colors,
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
  });
  }

  loadthemes() {
    this.http.get(Constants.BACK_URL + '/theme/all').subscribe({
      next:(valiny: any)=> {
        this.themes = valiny.data;
        this.initialThemes = valiny.data;
        this.activeTheme = this.initialThemes[0];
        this.taille = this.initialThemes.length;
        console.log(this.activeTheme);
        this.getChart(this.activeTheme);
      },
      error:(err) => {
        console.error('Error fetching theme', err);
        Display.alert(this.snackbar,err.error.message,"close",6000);
      }
    });
  }

  next() {
    if (this.taille == 0) {
      return;
    }

    let newIndex = this.currentIndex + 1;
    if (newIndex >= this.taille) {
      newIndex = 0;
    }

    this.activeTheme = this.initialThemes[newIndex]
    this.getChart(this.activeTheme);
    this.currentIndex = newIndex;
  }

  getChart(active: any) {
    this.http.get(Constants.BACK_URL + '/stat/theme/' + active.id_theme).subscribe({
      next:(valiny: any)=> {
        this.activeTheme.gain = valiny.data.gain;
        this.activeTheme.usedCount = valiny.data.usedCount;
        this.renderChart(valiny.data);
      },
      error:(err) => {
        console.error('Error fetching theme', err);
        Display.alert(this.snackbar,err.error.message,"close",6000);
      }
    });
  }

  previous() {
    if (this.taille == 0) {
      return;
    }

    let newIndex = this.currentIndex - 1;
    if (newIndex < 0) {
      newIndex = this.taille - 1;
    }

    this.activeTheme = this.initialThemes[newIndex];
    this.getChart(this.activeTheme);
    this.currentIndex = newIndex;
  }
}
