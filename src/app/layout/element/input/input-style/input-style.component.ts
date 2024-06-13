import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-style',
  templateUrl: './input-style.component.html',
  styleUrl: './input-style.component.css'
})
export class InputStyleComponent {
  @Input() type = 'text';
  @Input() class = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() name = '';
  @Input() formGroup: any;
}
