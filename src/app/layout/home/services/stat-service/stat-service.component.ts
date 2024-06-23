import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip
} from "ng-apexcharts";

import { Constants } from "../../../../class/util/constants";
import {Display} from "../../../../class/util/display"; // Assurez-vous d'importer vos constantes correctement

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stat-service',
  templateUrl: './stat-service.component.html',
  styleUrls: ['./stat-service.component.css']
})
export class StatServiceComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public selectedPeriod: string = "today"; // Période par défaut

  constructor(private http: HttpClient, private alert: MatSnackBar) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 300
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      colors: [],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"]
        },
        formatter: function(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: [],
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: "Analysis of Photobooth Services",
        align: "center",
        floating: true
      },
      subtitle: {
        text: "Category Names as DataLabels inside bars",
        align: "center"
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      }
    };
  }

  ngOnInit() {
    this.loadDataForPeriod(this.selectedPeriod);
    this.changePeriod('today');
  }

  loadDataForPeriod(period: string): void {
    let endpoint = Constants.BACK_URL + "/stat/service/";

    switch (period) {
      case "today":
        endpoint += "1";
        break;
      case "last30days":
        endpoint += "2";
        break;
      case "thisyear":
        endpoint += "3";
        break;
      default:
        endpoint += "1";
    }

    this.http.get<any>(endpoint).subscribe(
        (data) => {
          const categories = data.data.categories;
          const values = data.data.data;
          const colors = data.data.colors;

          if (categories && values && colors) {
            this.chartOptions.series = [
              {
                data: values
              }
            ];
            this.chartOptions.xaxis = {
              categories: categories.map((cat: string) => cat.replace(/_/g, " "))
            };
            this.chartOptions.colors = colors;
          } else {
            Display.alert(this.alert, "Wrong data", "close",3000);
          }
        },
        (error) => {
          Display.alert(this.alert, "Error ,see log", "close",3000);
          console.error("Erreur lors du chargement des données :", error);
        }
    );
  }

  changePeriod(period: string): void {
    this.selectedPeriod = period;
    this.loadDataForPeriod(period);
  }
}
