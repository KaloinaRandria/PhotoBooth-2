import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Display} from "../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DashboardService} from "../../../service/dashboard/dashboard.service";
import {BrowserModule, Title} from "@angular/platform-browser";
import { Constants } from '../../../class/util/constants';
import {Chart, registerables} from "chart.js";
import {ProfitStatComponent} from "../../element/profit-stat/profit-stat.component";
import {HttpClient} from "@angular/common/http";
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  getSource(item: any) {
    return Constants.BACK_URL + item.imageThemes[0].image_url;
  }

  themeList: any[] = [];
  constructor(
    private titleService: Title,
    private dash: DashboardService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.titleService.setTitle("PB | Dashboard");

    const temp = {
      start: "2020-01-01",
      end: "2030-01-01"
    }

    this.loadFinance(temp);
    this.loadThemes(temp);
  }

  loadThemes(data: any) {
    this.http.post(Constants.BACK_URL + '/theme/range', data).subscribe({
      next: (valiny: any) => {
        this.themeList = valiny.data;
        console.log("eto");
        console.log(valiny);
        },
      error: (err) => {
        console.error('olanaa');
        console.error(err);
      }
    });
  }

  filter : any = {
    start : "",
    end : ""
  }

  minDate: number | undefined;
  maxDate: number | undefined;

  @ViewChild(ProfitStatComponent) profitStatComponent!: ProfitStatComponent;

  filterFunc() {
    const startDate = new Date(this.filter.start).getTime();
    const endDate = new Date(this.filter.end).getTime();

    if (!isNaN(startDate) && !isNaN(endDate)) {
      this.minDate = startDate;
      this.maxDate = endDate;
    } else {
      this.minDate = undefined;
      this.maxDate = undefined;
    }

    if (this.profitStatComponent) {
      this.profitStatComponent.updateChartOptions(this.minDate, this.maxDate);
    }

    this.loadThemes(this.filter);
    this.loadServiceStat();
    this.loadFinance(this.filter);
  }

  serv: any;

  loadServiceStat() {
    this.http.post(Constants.BACK_URL + '/stat/service/range', this.filter).subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        this.serv = valiny.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  finance: any;

  loadFinance(data: any) {
    this.http.post(Constants.BACK_URL + '/stat/finance/range', data).subscribe({
      next: (valiny: any) => {
        console.log(valiny.data.attributes);
        this.finance = valiny.data.attributes;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  applyOpacity(color: string): string {
    const rgbValue = this.hexToRgb(color);
    const rgbaValue = `rgba(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}, 0.2)`; // 0.2 correspond à 20% d'opacité
    return rgbaValue;
  }

  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    // Supprimer le # du début s'il est présent
    hex = hex.replace('#', '');

    // Convertir en valeurs RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }
}
