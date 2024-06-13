import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../../../service/category/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoomService} from "../../../../service/room/room.service";
import {Display} from "../../../../class/util/display";

@Component({
  selector: 'app-insert-room',
  templateUrl: './insert-room.component.html',
  styleUrl: './insert-room.component.css'
})
export class InsertRoomComponent {
  form : FormGroup;
  constructor(private roomService: RoomService,private formBilder:FormBuilder,private snackBar : MatSnackBar) {
    this.form = formBilder.group({
      numero : ['']
    })
  }
  submitForm(){
    const data={
      numero : this.form.get('numero')?.value
    };
    this.roomService.save(data,"/salle/save").subscribe({
      next:()=>{
        Display.alert(this.snackBar,"Sended successfully","close",3000,"succes-snackbar");
      },
      error:(exception)=>{
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    })
  }
}
