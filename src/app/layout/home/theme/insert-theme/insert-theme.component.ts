import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../../service/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Display } from '../../../../class/util/display';
import { RoomService } from '../../../../service/room/room.service';

@Component({
  selector: 'app-insert-theme',
  templateUrl: './insert-theme.component.html',
  styleUrls: ['./insert-theme.component.css']
})
export class InsertThemeComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  rooms: any[] = [];

  constructor(private categoryService: CategoryService,private formBuilder: FormBuilder, private snackBar: MatSnackBar, private roomService: RoomService) {
    this.form = this.formBuilder.group({
      intitule: [''],
      categorie: [''],
      description: [''],
      image: [null],
      room: [''],
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
    }
  }

  submitForm() {
    const formData = new FormData();

    formData.append('intitule', this.form.get('intitule')?.value);
    formData.append('id_categorie_theme', this.form.get('categorie')?.value);
    formData.append('description', this.form.get('description')?.value);

    const imageFile = this.form.get('image')?.value as File;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    formData.append('id_salle', this.form.get('room')?.value);
    formData.append('debut', this.form.get('debut')?.value);
    formData.append('fin', this.form.get('fin')?.value);

    this.categoryService.save(formData, "/categ/save").subscribe({
      next: () => {
        Display.alert(this.snackBar, "Sent successfully", "close", 3000, "success-snackbar");
      },
      error: (exception) => {
        Display.alert(this.snackBar, (exception.error.message), "close", 6000);
      }
    });
  }
}
