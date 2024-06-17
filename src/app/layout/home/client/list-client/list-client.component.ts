import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent {
  constructor(private dialog: MatDialog) {}

  popUp() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '100vh',
      height:'90vh',
      data: {}
    });

  }
}
