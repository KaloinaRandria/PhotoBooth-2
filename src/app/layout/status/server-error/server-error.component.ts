import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent implements OnInit {

  constructor(private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle("500");
  }
  reload() {

  }
}
