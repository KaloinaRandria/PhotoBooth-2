import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; // Import des Validators et FormBuilder
import { RoomService } from "../../../../service/room/room.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Display } from "../../../../class/util/display";

@Component({
  selector: 'app-insert-room',
  templateUrl: './insert-room.component.html',
  styleUrls: ['./insert-room.component.css']
})
export class InsertRoomComponent {
  form: FormGroup;

  constructor(private roomService: RoomService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      numero: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.form.valid) {
      const data = {
        numero: this.form.get('numero')?.value
      };

      this.roomService.save(data, "/salle/save").subscribe({
        next: () => {
          Display.alert(this.snackBar, "Sended successfully", "close", 3000, "succes-snackbar");
        },
        error: (exception) => {
          Display.alert(this.snackBar, (exception.error.message), "close", 6000);
        }
      });
    } else {
      Display.alert(this.snackBar, "Please fill out all fields correctly.", "close", 3000);
    }
  }
}
