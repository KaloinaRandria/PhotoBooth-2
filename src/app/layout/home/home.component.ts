import {Component, OnInit} from '@angular/core';
import {User} from "../../class/model/user/user";
import {Router} from "@angular/router";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isSideNavCollapsed = true;
  screenWidth = 780;

  constructor(private router: Router) {
  }

  ngOnInit() {
    // if (!User.verify()) {
    //   this.router.navigate(['/login']).then(r => true);
    // }
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
