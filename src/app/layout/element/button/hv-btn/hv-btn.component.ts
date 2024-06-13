import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hv-btn',
  templateUrl: './hv-btn.component.html',
  styleUrl: './hv-btn.component.css'
})
export class HvBtnComponent {
  @Input() btnText: string = 'PhotoBooth';
}
