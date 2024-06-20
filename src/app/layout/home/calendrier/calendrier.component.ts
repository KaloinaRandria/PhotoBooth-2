import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Router} from "@angular/router";
import {PageAccess} from "../../../class/util/pageAccess";
import {Location} from "@angular/common";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent implements OnInit{
  calendarOptions: CalendarOptions | undefined;

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
    if(!PageAccess.autoVerifiatePermission(this.router)) {
      this.location.back();
    }
    this.initializeCalendarOptions();
  }

  initializeCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Event 1', start: '2024-06-16T10:15:00', end: '2024-06-16T11:45:00', classNames: ['event-type-1'] },
        { title: 'Event 2', start: '2024-06-16T14:30:00', end: '2024-06-16T16:00:00', classNames: ['event-type-2'] },
        { title: 'Event 3', start: '2024-06-17T09:45:00', end: '2024-06-17T11:15:00', classNames: ['event-type-3'] },
        { title: 'Event 4', start: '2024-06-17T13:00:00', end: '2024-06-17T14:30:00', classNames: ['event-type-1'] },
        { title: 'Event 5', start: '2024-06-18T11:30:00', end: '2024-06-18T13:00:00', classNames: ['event-type-2'] },
        { title: 'Event 6', start: '2024-06-18T15:45:00', end: '2024-06-18T17:15:00', classNames: ['event-type-3'] },
        { title: 'Event 7', start: '2024-06-19T09:00:00', end: '2024-06-19T10:30:00', classNames: ['event-type-1'] },
        { title: 'Event 8', start: '2024-06-19T12:15:00', end: '2024-06-19T13:45:00', classNames: ['event-type-2'] },
        { title: 'Event 9', start: '2024-06-20T10:45:00', end: '2024-06-20T12:15:00', classNames: ['event-type-3'] },
        { title: 'Event 10', start: '2024-06-20T14:00:00', end: '2024-06-20T15:30:00', classNames: ['event-type-1'] },
        { title: 'Event 11', start: '2024-06-21T11:15:00', end: '2024-06-21T12:45:00', classNames: ['event-type-2'] },
        { title: 'Event 12', start: '2024-06-21T15:30:00', end: '2024-06-21T17:00:00', classNames: ['event-type-3'] },
        { title: 'Event 13', start: '2024-06-22T09:30:00', end: '2024-06-22T11:00:00', classNames: ['event-type-1'] },
        { title: 'Event 14', start: '2024-06-22T13:45:00', end: '2024-06-22T15:15:00', classNames: ['event-type-2'] },
      ],
      eventOrder: ''
    };
  }
}
