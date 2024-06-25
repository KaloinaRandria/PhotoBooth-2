import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../class/util/constants";
import {Display} from "../../../class/util/display";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Navigation} from "../../../class/util/navigation";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{

  initialNotifs: any[] = [];
  notifs: any[] = [];
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllNotif();
  }

  page: number = 1;
  maxPage: number = 1;

  next() {
    this.page = this.page + 1;
    this.notifs = Navigation.paginate(this.initialNotifs, this.page);
  }

  previous() {
    this.page = this.page - 1;
    this.notifs = Navigation.paginate(this.initialNotifs, this.page);
  }

  getAllNotif() {
    this.http.get(Constants.BACK_URL + '/notif/all').subscribe({
      next:(response:any) => {
        this.initialNotifs = response.data;
        this.notifs = Navigation.paginate(this.initialNotifs, this.page);
        this.maxPage = Navigation.maxPage(this.initialNotifs);
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
        console.error(exception);
      }
    });
  }

  reformatDate(dateStr: string): string {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
