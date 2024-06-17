import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../../service/staff/staff.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {PopUpContentComponent} from "./pop-up-content/pop-up-content.component";

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrl: './list-staff.component.css'
})
export class ListStaffComponent implements OnInit{
  staff : any[]=[];

  ngOnInit() {
    this.getAllStaff();
  }

  constructor(private staffService : StaffService , private snackBar : MatSnackBar ,private dialog: MatDialog) {
  }

  popUp() {

    const dialogRef = this.dialog.open(PopUpContentComponent, {
      width: '100vh',
      height:'90vh',
      data: {}
    });

  }
  getAllStaff():void {
    const api = '/membre/all';
    this.staffService.getAll(api).subscribe({
      next:(response: any) => {
      if (response.success) {
        this.staff = response.data;
        console.log(this.staff);
      }  else {
        Display.alert(this.snackBar,(response.message),"close",6000);
      }
    },
      error:(exception) => {
        Display.alert(this.snackBar, (exception.error.message), "close", 6000);
      }
    });

  }
}
