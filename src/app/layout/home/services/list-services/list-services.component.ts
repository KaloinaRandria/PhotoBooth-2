import { Component } from '@angular/core';
import { ServicesBoothService } from '../../../../service/services/services-booth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../class/util/display';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrl: './list-services.component.css'
})
export class ListServicesComponent {

  constructor(private service : ServicesBoothService , private snackBar : MatSnackBar) {
  }

  getAllServices() {
    const api = 'service/all';
    this.service.getAll(api).subscribe({
       next:(response : any) =>{
        if (response.success) {
          
        } else {
          Display.alert(this.snackBar,(response.message),"close",6000);
        }
      },
      error:(exception) => {
        Display.alert(this.snackBar , (exception.error.message),"close",6000);
      }
    });
  }
}
