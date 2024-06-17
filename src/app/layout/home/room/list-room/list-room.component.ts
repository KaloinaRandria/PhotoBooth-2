import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../class/util/constants";
import {RoomService} from "../../../../service/room/room.service";
import {Observable} from "rxjs";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  roomsInitial: any[] = [];
  rooms: any[] = [];

  filter: any = {
    room: ''
  }

  constructor(private roomService: RoomService,private snackBar:MatSnackBar,private dialog: MatDialog) {}
  popUp() {

    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '100vh',
      height:'90vh',
      data: {}
    });

  }
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
          this.roomsInitial = response.data;
        } else {
          console.error('Failed to fetch rooms');
        }
      },
      (error) => {
        console.error('Error fetching rooms', error);
        Display.alert(this.snackBar,error.error.message,"close",6000);
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
          console.error('Failed to delete room');
          Display.alert(this.snackBar,'Failed to delete room',"close",6000);
        }
      },
      (error)=>{
        console.error(error);
        Display.alert(this.snackBar,error.error.message,"close",6000);
      }
    );
  }

  filterPro(
      roomList: any[],
      filter: any
  ): any[] {
    return roomList.filter(room => {

      const matchesNumber = filter.room && filter.room !== '' ?
          (room.numero && room.numero === Number(filter.room)) : true;

      return (
          matchesNumber
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterPro(this.roomsInitial, this.filter);
    this.rooms = filterTab;
  }

  initial() {
    this.rooms = this.roomsInitial;
  }
}
