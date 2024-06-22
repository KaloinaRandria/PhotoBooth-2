import { Component, OnInit } from '@angular/core';
import { ServicesBoothService } from '../../../../service/services/services-booth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../class/util/display';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrl: './list-services.component.css'
})
export class ListServicesComponent implements OnInit{
  services : any[] = [];
  constructor(private service : ServicesBoothService , private snackBar : MatSnackBar) {
  }

  applyOpacity(color: string): string {
    const rgbValue = this.hexToRgb(color);
    const rgbaValue = `rgba(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}, 0.2)`; // 0.2 correspond à 20% d'opacité
    return rgbaValue;
  }

  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    // Supprimer le # du début s'il est présent
    hex = hex.replace('#', '');

    // Convertir en valeurs RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }

  ngOnInit() {
    this.getAllServices();
  }
  getAllServices() {
    const api = '/service/all';
    this.service.getAll(api).subscribe({
       next:(response : any) =>{
        if (response.success) {
          this.services = response.data;
          console.log(this.services);
        } else {
          Display.alert(this.snackBar,(response.message),"close",6000);
        }
      },
      error:(exception) => {
           console.log(exception);
        Display.alert(this.snackBar , (exception.error.message),"close",6000);
      }
    });
  }
}
