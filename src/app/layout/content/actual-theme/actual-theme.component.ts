import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../class/util/constants";
import {Display} from "../../../class/util/display";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-actual-theme',
  templateUrl: './actual-theme.component.html',
  styleUrl: './actual-theme.component.css'
})
export class ActualThemeComponent implements OnInit {
  actual: any[] = [];

  constructor(private http : HttpClient, private snackBar : MatSnackBar) {
  }


  ngOnInit() {
    this.loadActual();
  }

  loadActual() {
    this.http.get(Constants.BACK_URL + '/salle/curr').subscribe({
      next:(response:any) => {
        this.actual = response.data;
        console.log(this.actual);
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
        console.error(exception);
      }
    });
  }

  getSource(item: any) {
    return Constants.BACK_URL + item.imageThemes[0].image_url;
  }

  getType(isFree: boolean) {
    if(isFree) {
      return "success"
    } else {
      return "danger";
    }
  }
}
