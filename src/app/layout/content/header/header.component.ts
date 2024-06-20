import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from "../../../class/model/user/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {
  PopUpConfirmationComponent
} from "../../home/reservation/list-reservation/pop-up-confirmation/pop-up-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {LogoutPopUpComponent} from "./logout-pop-up/logout-pop-up.component";

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
  constructor(private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit() {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.startTyping();
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
    const dialogRef = this.dialog.open(LogoutPopUpComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        User.logOut(this.router);
      }
    });
  }

  getNom() {
    if (this.userConnected) {
      return this.userConnected.nom;
    }
    return 'sudo';
  }

  slogans: string[] = [
    "Magic in front, and behind the camera",
    "Capture Your Best Moments Instantly!",
    "Smile, Snap, Repeat!"
  ];

  currentSloganIndex: number = 0;
  currentCharIndex: number = 0;
  sloganInterval: any;
  sloganDelay: number = 100; // Délai entre chaque caractère (en millisecondes)

  sloganText: string = '';

  startTyping() {
    this.sloganInterval = setInterval(() => {
      if (this.currentCharIndex < this.slogans[this.currentSloganIndex].length) {
        this.sloganText += this.slogans[this.currentSloganIndex].charAt(this.currentCharIndex);
        this.currentCharIndex++;
      } else {
        clearInterval(this.sloganInterval);
        setTimeout(() => {
          this.currentCharIndex = 0;
          this.sloganText = '';
          this.currentSloganIndex = (this.currentSloganIndex + 1) % this.slogans.length; // Boucle à l'infini sur les slogans
          this.startTyping(); // Reprendre l'affichage du prochain slogan
        }, 2000); // Délai entre les slogans (en millisecondes)
      }
    }, this.sloganDelay);
  }
}
