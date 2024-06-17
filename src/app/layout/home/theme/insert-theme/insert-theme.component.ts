import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../../service/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../class/util/display';
import { RoomService } from '../../../../service/room/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-theme',
  templateUrl: './insert-theme.component.html',
  styleUrls: ['./insert-theme.component.css']
})
export class InsertThemeComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  rooms: any[] = [];

  constructor(private categoryService: CategoryService,private formBuilder: FormBuilder, private snackBar: MatSnackBar, private roomService: RoomService, private router: Router, private alert: MatSnackBar) {
    this.form = this.formBuilder.group({
      intitule: [''],
      categorie: [''],
      description: [''],
      salle: [''],
      debut: [''],
      fin: ['']
    });
  }

  ngOnInit() {
    this.loadRooms();
    this.loadCategories();
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

  loadCategories(): void {
    const url = `/categ/all`;
    console.log('Fetching categories from:', url);
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
      }
    );
  }

 

  submitForm() {
    const formData = new FormData();

    const info = {
      intitule: this.form.get('intitule')?.value,
      categorie_theme: {id_categorie_theme: this.form.get('categorie')?.value} ,
      description: this.form.get('description')?.value,
      salle: {id_salle:this.form.get('salle')?.value} ,
      date_debut: this.form.get('debut')?.value,
      date_fin: this.form.get('fin')?.value
    }

    if(!this.verifiate(info)) {
      Display.alert(this.alert , 'complete all input',"close",3000);
      return;
    }

    localStorage.setItem('info', JSON.stringify(info));

    this.router.navigate(['home/theme/insert/materiel']).then(r => true);
  }

  private verifiate(info: any): boolean {
    return !Object.values(info).some(value => 
      value === null || 
      value === undefined || 
      (typeof value === 'string' && value.trim() === '')
    );
  }
}
