import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-bad-request',
  templateUrl: './bad-request.component.html',
  styleUrl: './bad-request.component.css'
})
export class BadRequestComponent implements OnInit{
  constructor(private router: Router, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle("404");
  }

  goHome() {
    this.router.navigate(['/login']).then(r => true);
  }
}
