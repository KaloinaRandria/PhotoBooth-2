import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexTitleSubtitle,
  ChartComponent
} from 'ng-apexcharts';
import { Constants } from '../../../../class/util/constants';
import {diff} from "ngx-bootstrap/chronos/moment/diff";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels?: ApexDataLabels;
  stroke: ApexStroke;
  markers: ApexMarkers; // Ensure this is not optional
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'app-stat-revenue',
  templateUrl: './stat-revenue.component.html',
  styleUrls: ['./stat-revenue.component.css']
})
export class StatRevenueComponent implements OnInit {
  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions: ChartOptions;  // Ensure that ChartOptions is fully initialized

  selectedYear: number = 2024;
  currentBenefice: number = 0;
  currentDepense: number = 0;
  info: any;
  depenseDiv: string = '';
  depenseArrow: string = '';
  benefDiv: string = '';
  benefArrow: string = '';

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
    this.chartOptions = {
      series: [
        {
          name: 'Profit',
          data: []
        },
        {
          name: 'Expense',
          data: []
        },
        {
          name: 'Revenue',
          data: []
        }
      ],
      chart: {
        type: 'area',
        height: 350
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          }
        }
      },
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 5 // Initialize markers with a default value
      },
      title: {
        text: 'Financial Statistics',
        align: 'left'
      },
      colors: ['#00E396', '#FF4560', '#008FFB']
    };
  }

  ngOnInit() {
    this.loadData(this.selectedYear);
  }

  loadData(year: number) {
    this.http.get(Constants.BACK_URL + '/stat/financial/' + year).subscribe({
      next: (valiny: any) => {
        const info = valiny.data.attributes;
        this.updateChart(info);
        this.currentBenefice = info.total_benefice;
        this.currentDepense = info.total_depense;
        this.info = info;

        if (info.diff_benefice >= 0) {
          this.benefDiv = 'success';
          this.benefArrow = 'top-right';
        } else {
          this.benefDiv = 'danger';
          this.benefArrow = 'bottom-right';
        }

        console.log(info.diff_depense);
        if (info.diff_depense == 'Infinity') {
          this.depenseDiv = 'info';
          this.depenseArrow = 'right';
        }
        else if (info.diff_depense < 0) {
          this.depenseDiv = 'success';
          this.depenseArrow = 'top-right';
        } else {
          this.depenseDiv = 'danger';
          this.depenseArrow = 'bottom-right';
        }

        console.log(valiny);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateChart(info: any) {
    this.chartOptions.series = [
      {
        name: 'Profit',
        data: info.benefice
      },
      {
        name: 'Expense',
        data: info.depense
      },
      {
        name: 'Revenue',
        data: info.chiffre
      }
    ];
  }

  changeYear(nb: number) {
    this.selectedYear = this.selectedYear + nb;
    this.loadData(this.selectedYear);
  }

  refactor(nombre: number): number {
    if (!nombre) {
      return 0;
    }

    return Number(nombre.toFixed(2));
  }

  refactorBen(info: any) {
    try {
      return this.refactor(info.diff_benefice);
    } catch (e) {
      return 0;
    }
  }

  refactorDep(info: any) {
    try {
      return this.refactor(info.diff_depense);
    } catch (e) {
      return 0;
    }
  }
}
