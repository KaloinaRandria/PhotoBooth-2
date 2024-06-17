import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrl: './list-material.component.css'
})
export class ListMaterialComponent {
  constructor(private dialog: MatDialog) {
  }

  popUp() {

    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '100vh',
      height:'90vh',
      data: {}
    });

  }
}
