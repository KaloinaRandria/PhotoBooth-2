import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ChartComponent,
  ApexMarkers
} from 'ng-apexcharts';
import { Constants } from '../../../../class/util/constants';

@Component({
  selector: 'app-statistics-reservation',
  templateUrl: './statistics-reservation.component.html',
  styleUrls: ['./statistics-reservation.component.css']
})
export class StatisticsReservationComponent implements OnInit {
  @ViewChild('chart') chart?: ChartComponent;
  selectedYear: number = 2024;

  public chartOptions: any = {
    series: [],
    chart: {
      type: 'line',
      height: 350
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 5, // Adjust the size of the markers
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    title: {
      text: 'reservation stat',
      align: 'left'
    },
    colors: [
      '#775DD0', '#00E396', '#008FFB', '#FF4560'
    ]
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData(this.selectedYear);
  }

  info : any = {
    average: '',
    best_month: '',
    nb_total_reservation: '',
    nb_confirmed_reservation: '',
    nb_canceled_reservation: '',
    nb_processing_reservation: '',
    max_value: '',
  }

  fetchData(year: number) {
    this.http.get(Constants.BACK_URL + '/stat/resa/year/' + year)
        .subscribe((data: any) => {
          this.updateChart(data.data.attributes);
          this.info = {
            average: data.data.attributes.average,
            best_month: data.data.attributes.best_month,
            nb_total_reservation: data.data.attributes.nb_total_reservation,
            nb_confirmed_reservation: data.data.attributes.nb_confirmed_reservation,
            nb_canceled_reservation: data.data.attributes.nb_canceled_reservation,
            nb_processing_reservation: data.data.attributes.nb_processing_reservation,
            max_value: data.data.attributes.max_value,
          }
        });
  }

  updateChart(data: any) {
    console.log(data.total_reservation);
    this.chartOptions.series = [
      {
        name: 'total',
        data: data.total_reservation // Utilisez les données récupérées
      },
      {
        name: 'confirmed',
        data: data.confirmed_reservation // Utilisez les données récupérées
      },
      {
        name: 'in process',
        data: data.processing_reservation // Utilisez les données récupérées
      },
      {
        name: 'canceled',
        data: data.canceled_reservation // Utilisez les données récupérées
      }
    ];
  }

  changeYear(nb: number) {
    this.selectedYear = this.selectedYear + nb;
    this.fetchData(this.selectedYear);
  }

  format(num: number): string {
    if (isNaN(num)) {
      return ''; // Si num n'est pas un nombre, retourner une chaîne vide ou gérer l'erreur selon le cas
    }
    if (Number.isInteger(num)) {
      return num.toString(); // Si num est un entier, retourner la valeur entière sans décimales
    }
    return num.toFixed(2); // Utiliser toFixed pour formater le nombre avec deux décimales
  }
}
