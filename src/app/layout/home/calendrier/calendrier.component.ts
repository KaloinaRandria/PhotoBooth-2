import {Component, Inject, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Router} from "@angular/router";
import {PageAccess} from "../../../class/util/pageAccess";
import {Location} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Constants} from "../../../class/util/constants";
import {Display} from "../../../class/util/display";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent implements OnInit{
  calendarOptions: CalendarOptions | undefined;
  initialView = 'dayGridMonth';

  constructor(private router: Router,
              private location: Location,
              private http: HttpClient,
              private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    if(!PageAccess.autoVerifiatePermission(this.router)) {
      this.location.back();
    }
    this.initializeCalendarOptions();
    this.loadEvents();
  }

  initializeCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      views: {
        timeGridWeek: {
          allDaySlot: false
        },
        timeGridDay: {
          allDaySlot: false
        }
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [],
      eventOrder: ''
    };
  }

  loadEvents() {
    this.http.get(Constants.BACK_URL + '/resa/shedule').subscribe({
      next: (valiny: any) => {
        const events = valiny.data;
        console.log(events);
        this.calendarOptions = {
          ...this.calendarOptions,
          events: events
        };
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackbar , (err.error.message),"close",6000);
      }
    });
  }
}
