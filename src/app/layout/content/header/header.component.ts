import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from "../../../class/model/user/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  userConnected: any = undefined;
  constructor(private snackBar: MatSnackBar, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit() {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    try {
      this.userConnected = User.getUserAuth();
    } catch (e) {
    }
  }

  getHeadClass(): string {
    let styleClass: string;
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number) {
    this.canShowSearchAsOverlay = innerWidth < 845;
  }

  logOut() {
    let snackBarRef = this.snackBar.open('Would you like to disconnect ?', 'Yes');
    snackBarRef.onAction().subscribe(() => {
      User.logOut(this.router);
    });
  }
}
