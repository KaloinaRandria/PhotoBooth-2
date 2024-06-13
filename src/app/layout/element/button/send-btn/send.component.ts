import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent {
  @Input() btnText: string = '';
}
