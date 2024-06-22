import { Component, OnInit } from '@angular/core';
import { RoomService } from "../../../../service/room/room.service";
import { Display } from "../../../../class/util/display";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ModifyRoomComponent } from "./modify-room/modify-room.component";

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
  };

  constructor(
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  popUp(room: any): void {
    this.dialog.open(ModifyRoomComponent, {
      data: { room }
    });
  }

  loadRooms(): void {
    const url = `/salle/all`;
    console.log('Fetching rooms from:', url);
    this.roomService.getAll(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.rooms = response.data;
          this.roomsInitial = response.data;
        } else {
          console.error('Failed to fetch rooms');
          Display.alert(this.snackBar, 'Failed to fetch rooms', 'close', 6000);
        }
      },
      (error) => {
        console.error('Error fetching rooms', error);
        Display.alert(this.snackBar, error.error.message, 'close', 6000);
      }
    );
  }

  delete(room: any): void {
    const url = `/salle/delete/${room.id_salle}`;
    this.roomService.delete(url).subscribe(
      (response: any) => {
        if (response.success) {
          const index = this.rooms.findIndex(ro => ro.id_salle === room.id_salle);
          this.rooms.splice(index, 1);
          Display.alert(this.snackBar, 'Deleted successfully', 'close', 3000, 'success-snackbar');
        } else {
          console.error('Failed to delete room');
          Display.alert(this.snackBar, 'Failed to delete room', 'close', 6000);
        }
      },
      (error) => {
        console.error('Error deleting room', error);
        Display.alert(this.snackBar, error.error.message, 'close', 6000);
      }
    );
  }

  filterRooms(roomList: any[], filter: any): any[] {
    return roomList.filter(room => {
      const matchesNumber = filter.room && filter.room !== '' ?
        (room.numero && room.numero === Number(filter.room)) : true;

      return matchesNumber;
    });
  }

  filterFunc(): void {
    this.rooms = this.filterRooms(this.roomsInitial, this.filter);
  }

  initial(): void {
    this.rooms = this.roomsInitial;
  }
}
