import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistics-client',
  templateUrl: './statistics-client.component.html',
  styleUrl: './statistics-client.component.css'
})
export class StatisticsClientComponent {

}
