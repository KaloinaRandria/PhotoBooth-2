import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  @Output() buttonClicked = new EventEmitter<void>();
  @Input() data: any = undefined;
  @Input() className: any = undefined;
  onButtonClick() {
    this.buttonClicked.emit();
  }
}
