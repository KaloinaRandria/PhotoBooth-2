import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Display} from "../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../class/model/user/user";
import {DataSecurity} from "../../../class/util/data-security";
import {DashboardService} from "../../../service/dashboard/dashboard.service";
import {BrowserModule, Title} from "@angular/platform-browser";
import html2pdf from 'html2pdf.js';
import { Constants } from '../../../class/util/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  getSource(item: any) {
    console.log(item.imageThemes[0].image_url);
    return Constants.BACK_URL + item.imageThemes[0].image_url;
  }

  themeList: any[] = [];
  constructor(
    private titleService: Title,
    private dash: DashboardService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.titleService.setTitle("PB | Dashboard");
    this.getAllTheme();
  }

  getAllTheme() {
    this.dash.getAllTheme('/theme/all').subscribe({
      next:(response:any) => {
        this.themeList = response.data;
        console.log(this.themeList);
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
        console.error(exception);
      }
    });
  }

  slides = [
    { image: 'https://picsum.photos/id/700/900/500', captionTitle: 'First Slide', captionText: 'This is the first slide' },
    { image: 'https://picsum.photos/id/701/900/500', captionTitle: 'Second Slide', captionText: 'This is the second slide' },
    { image: 'https://picsum.photos/id/702/900/500', captionTitle: 'Third Slide', captionText: 'This is the third slide' }
  ];
}
