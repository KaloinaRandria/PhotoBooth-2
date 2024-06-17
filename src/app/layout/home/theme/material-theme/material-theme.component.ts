import { Component } from '@angular/core';

@Component({
  selector: 'app-material-theme',
  templateUrl: './material-theme.component.html',
  styleUrl: './material-theme.component.css'
})
export class MaterialThemeComponent {
  materials = [
    { name: 'Matériel 1', checked: false, quantity: 1 },
    { name: 'Matériel 2', checked: false, quantity: 1 },
    { name: 'Matériel 3', checked: false, quantity: 1 }
  ];

  toggleQuantity(index: number) {
    if (!this.materials[index].checked) {
      this.materials[index].quantity = 1;
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.materials);
  }
}
