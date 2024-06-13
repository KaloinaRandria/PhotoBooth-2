import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../class/util/constants";
import {RoomService} from "../../../../service/room/room.service";
import {Observable} from "rxjs";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomService: RoomService,private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    const url = `/salle/all`;
    console.log('Fetching categories from:', url);
    this.roomService.getAll(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.rooms = response.data;
        } else {
          console.error('Failed to fetch rooms');
        }
      },
      (error) => {
        console.error('Error fetching rooms', error);
      }
    );
  }
  delete(room:any):void{
    const url='/salle/delete/'+room.id_salle;
    this.roomService.delete(url).subscribe(
      (response:any) =>{
        if(response.success){
          const index = this.rooms.findIndex(ro => ro.id_categorie_theme === room.id_salle);
          Display.alert(this.snackBar,"Deleted succesfully","close",3000,"succes-snackbar");
          this.rooms.splice(index,1);
        } else{
          console.error('Failed to delete room')
        }
      },
      (error)=>{
        console.error(error);
        Display.alert(this.snackBar,error,"close",6000);
      }
    );
  }
}
