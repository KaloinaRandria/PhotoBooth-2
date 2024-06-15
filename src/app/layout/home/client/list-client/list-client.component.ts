import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../../../service/client/client.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent implements OnInit{
  client : any[] = [];
  ngOnInit() {
    this.getAllClient();
  }
  constructor(private clientService : ClientService , private snackBar : MatSnackBar) {
  }
  getAllClient():void{
    const api = '/client/all';
    this.clientService.getAll(api).subscribe({
      next:(response : any) =>{
        if (response.success) {
          this.client = response.data;
          console.log(this.client);
        } else {
          Display.alert(this.snackBar,(response.message),"close",6000);
        }
      },
      error:(exception) => {
        Display.alert(this.snackBar , (exception.error.message),"close",6000);
      }
    });
  }
  calculateAge(dateOfBirth : string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
}
