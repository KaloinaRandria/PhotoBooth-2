import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Mise à jour de l'import
import { CategoryService } from '../../../../service/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../class/util/display';
import { RoomService } from '../../../../service/room/room.service';
import { Router } from '@angular/router';
import { dateRangeValidator } from '../../../../validators/date.validator'; // Assurez-vous d'importer correctement

@Component({
  selector: 'app-insert-theme',
  templateUrl: './insert-theme.component.html',
  styleUrls: ['./insert-theme.component.css']
})
export class InsertThemeComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  rooms: any[] = [];

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private roomService: RoomService, private router: Router, private alert: MatSnackBar) {
    this.form = this.formBuilder.group({
      intitule: ['', Validators.required],
      categorie: ['', Validators.required],
      description: ['', Validators.required],
      salle: ['', Validators.required],
      debut: ['', Validators.required],
      fin: ['', Validators.required]
    }, {
      validators: dateRangeValidator() // Utilisez le validateur de manière correcte ici
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
    if (this.form.valid) {
      const formData = new FormData();

      const info = {
        intitule: this.form.get('intitule')?.value,
        categorie_theme: { id_categorie_theme: this.form.get('categorie')?.value },
        description: this.form.get('description')?.value,
        salle: { id_salle: this.form.get('salle')?.value },
        date_debut: this.form.get('debut')?.value,
        date_fin: this.form.get('fin')?.value
      };

      localStorage.setItem('info', JSON.stringify(info));

      this.router.navigate(['home/theme/insert/materiel']).then(r => true);
    } else {
      Display.alert(this.alert, 'Complete all inputs', 'close', 3000);
    }
  }
}
