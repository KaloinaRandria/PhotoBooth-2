import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Inclusion du plugin dayGrid ici
    initialView: 'dayGridMonth', // Vue initiale du calendrier (mois)
    events: [ // Exemple d'événements à afficher dans le calendrier

      { title: ' tournage', date: '2024-06-19' },
      { title: ' album', date: '2024-06-19' },
      { title: ' bbb', date: '2024-06-19' },
      { title: 'Event 2', date: '2024-06-20' },
    ]
  };
}
