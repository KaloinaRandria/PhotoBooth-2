import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-danger',
  templateUrl: './danger.component.html',
  styleUrl: './danger.component.css'
})
export class DangerComponent {
  @Output() buttonClicked = new EventEmitter<void>();
  @Input() data: any = undefined;

  onButtonClick() {
    this.buttonClicked.emit();
  }
}
