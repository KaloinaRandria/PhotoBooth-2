import { RoomService } from './../../../../service/room/room.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../class/util/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../class/util/display';
import { CategoryService } from '../../../../service/category/category.service';
import { ModiftThemeComponent } from "./modift-theme/modift-theme.component";
import { MatDialog } from "@angular/material/dialog";
import {Navigation} from "../../../../class/util/navigation";

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.css'] // Correction de 'styleUrl' en 'styleUrls'
})
export class ListThemeComponent implements OnInit {

  filter: any = {
    intitule: '',
    categorie: '',
    room: '',
    startDate: '',
    endDate: '',
    minWorth: '',
    maxWorth: ''
  }

  rooms: any[] = [];
  categories: any[] = [];
  themeList: any[] = [];
  initialThemes: any[] = [];

  page: number = 1;
  maxPage: number = 1;

  next() {
    this.page = this.page + 1;
    this.themeList = Navigation.paginate(this.initialThemes, this.page);
  }

  previous() {
    this.page = this.page - 1;
    this.themeList = Navigation.paginate(this.initialThemes, this.page);
  }

  constructor(private dialog: MatDialog, private http: HttpClient, private roomService: RoomService, private snackBar: MatSnackBar, private categoryService: CategoryService) {
    this.getAllTheme();
    this.loadRooms();
    this.loadCategories();
  }

  getSource(item: any) {
    return Constants.BACK_URL + item.imageThemes[0].image_url;
  }

  ngOnInit(): void {}

  getAllTheme() {
    this.http.get(Constants.BACK_URL + '/theme/all').subscribe({
      next: (valiny: any) => {
        this.initialThemes = valiny.data;
        this.themeList = Navigation.paginate(this.initialThemes, this.page);
        this.maxPage = Navigation.maxPage(this.initialThemes);
      },
      error: (err) => {
        console.error('Error fetching theme', err);
        Display.alert(this.snackBar, err.error.message, "close", 6000);
      }
    });
  }

  loadRooms(): void {
    const url = `/salle/all`;
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
        Display.alert(this.snackBar, error.error.message, "close", 6000);
      }
    );
  }

  loadCategories(): void {
    const url = `/categ/all`;
    this.categoryService.getAll(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
        } else {
          console.error('Failed to fetch categories');
        }
      },
      (error) => {
        console.error('Error fetching categories', error);
        Display.alert(this.snackBar, 'error', "close", 6000);
      }
    );
  }

  filterStaff(
    themeList: any[],
    filter: any
  ): any[] {
    return themeList.filter(theme => {
      const worth = theme.worth;

      const matchesIntitule = filter.intitule && filter.intitule !== '' ? theme.intitule.toLowerCase().includes(filter.intitule.toLowerCase()) : true;
      const matchesMinWorth = filter.minWorth && filter.minWorth !== '' ? worth >= Number(filter.minWorth) : true;
      const matchesMaxWorth = filter.maxWorth && filter.maxWorth !== '' ? worth <= Number(filter.maxWorth) : true;

      let matchesCategIntitule = true;
      if (filter.categorie && filter.categorie !== '') {
        matchesCategIntitule = theme.categorie_theme.id_categorie_theme.toLowerCase().includes(filter.categorie.toLowerCase());
      }

      let matchesRoomIntitule = true;
      if (filter.room && filter.room !== '') {
        matchesRoomIntitule = theme.salle.id_salle.toLowerCase().includes(filter.room.toLowerCase());
      }

      let matchesStartDate = true;
      let matchesEndDate = true;

      if (filter.startDate && filter.startDate !== '') {
        matchesStartDate = new Date(theme.date_debut) >= new Date(filter.startDate);
      }

      if (filter.endDate && filter.endDate !== '') {
        matchesEndDate = new Date(theme.date_fin) <= new Date(filter.endDate);
      }

      return (
        matchesIntitule &&
        matchesMinWorth &&
        matchesMaxWorth &&
        matchesCategIntitule &&
        matchesRoomIntitule &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterStaff(this.initialThemes, this.filter);
    this.themeList = filterTab;
  }

  initial() {
    this.themeList = Navigation.paginate(this.initialThemes, this.page);
  }

  popUp(theme: any) {
    const dialogRef = this.dialog.open(ModiftThemeComponent, {
      data: { theme:theme,room:this.rooms,category:this.categories }
    });
  }
}
