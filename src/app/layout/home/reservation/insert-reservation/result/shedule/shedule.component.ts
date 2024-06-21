import {Component, Inject} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageAccess} from "../../../../../../class/util/pageAccess";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Constants} from "../../../../../../class/util/constants";
import {Display} from "../../../../../../class/util/display";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrl: './shedule.component.css'
})
export class SheduleComponent {


  calendarOptions: CalendarOptions | undefined;
  date : string | undefined;

  constructor(private router: Router,
              private location: Location,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<SheduleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date = data.date;
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
      initialView: 'timeGridDay',
      initialDate: this.date,
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
