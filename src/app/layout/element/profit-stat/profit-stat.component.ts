import {Component, Input, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke
} from "ng-apexcharts";
import {Constants} from "../../../class/util/constants";
import {HttpClient} from "@angular/common/http";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-profit-stat',
  templateUrl: './profit-stat.component.html',
  styleUrls: ['./profit-stat.component.css']
})
export class ProfitStatComponent implements OnInit{
  @Input() minDate: number | undefined;
  @Input() maxDate: number | undefined;

  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [
      {
        data: []
      }
    ],
    chart: {
      type: "area",
      height: 350
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#999",
          label: {
            text: "Support",
            style: {
              color: "#fff",
              background: "#00E396"
            }
          }
        }
      ],
      xaxis: [
        {
          x: new Date("14 Nov 2012").getTime(),
          borderColor: "#999",
          label: {
            text: "Rally",
            style: {
              color: "#fff",
              background: "#775DD0"
            }
          }
        }
      ]
    },
    dataLabels: {
      enabled: false
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
      size: 0
    },
    title: {
      text: 'Financial Statistics',
      align: 'left'
    },
    xaxis: {
      type: "datetime",
      min: new Date("01 Jan 2023").getTime(),
      tickAmount: 6
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy"
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    colors: ['#8de383'], // Exemple de définition des couleurs
    toolbar: {
      show: false
    }
  };

  public activeOptionButton = "all";
  public updateOptionsData = {
    "LY": {
      xaxis: {
        min: new Date("1 Jan 2023").getTime(),
        max: new Date("31 Dec 2023").getTime()
      }
    },
    "CY": {
      xaxis: {
        min: new Date("1 Jan 2024").getTime(),
        max: new Date().getTime()
      }
    },
    "LM": {
      xaxis: {
        min: new Date("1 Jun 2024").getTime(),
        max: new Date().getTime()
      }
    },
    all: {
      xaxis: {
        min: undefined,
        max: undefined
      }
    }
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadData();
  }

  public updateOptions(option: any): void {
    this.activeOptionButton = option;
    if (this.chart) {
      // @ts-ignore
      this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
    }
  }

  loadData() {
    this.http.get(Constants.BACK_URL + '/stat/profit').subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        const info = valiny.data.attributes.data;
        this.updateChart(info);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateChart(info: any) {
    this.chartOptions.series = [
      {
        data: info
      }
    ];
  }

  updateChartOptions(minDate: number | undefined, maxDate: number | undefined) {
    this.activeOptionButton = "Custom";
    if (this.chart) {
      this.chart.updateOptions({
        xaxis: {
          min: minDate,
          max: maxDate
        }
      });
    }
  }
}
