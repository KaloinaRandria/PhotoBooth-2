import { CategoryService } from './../../../../service/category/category.service';
import { Constants } from './../../../../class/util/constants';
import { Component, OnInit } from '@angular/core';
import { Display } from '../../../../class/util/display';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-material-theme',
  templateUrl: './material-theme.component.html',
  styleUrl: './material-theme.component.css'
})
export class MaterialThemeComponent implements OnInit {
  materielsList: any[] = [];
  file: any = undefined;

  toggleQuantity(index: number) {
    if (!this.materielsList[index].checked) {
      //this.materielsList[index].count = 1;
    }
  }
  ngOnInit(): void {
    this.getAllMateriel();
  }

  constructor(private alert: MatSnackBar, private http: HttpClient, private categoryService: CategoryService) {

  }

  onSubmit() {
    let info = localStorage.getItem('info');
    if(!info) {
      Display.alert(this.alert , 'complete all previous input',"close",3000);
      return;
    } else {
      info = JSON.parse(info);
    }

    const ver = this.verifiate(info);
  
    if(!ver) {
      Display.alert(this.alert , 'complete all previous input',"close",3000);
      return;
    }

    if(!this.file) {
      Display.alert(this.alert , 'No file selected',"close",3000);
      return;
    }

    const data = this.patchData(this.materielsList);
    if(data.length === 0) {
      Display.alert(this.alert , 'No materiel selected',"close",3000);
      return;
    }

    console.log(data);

    const mat = {
      materielDataList : data
    }
    
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('data', new Blob([JSON.stringify(info)], { type: 'application/json' }));
    formData.append('materiel', new Blob([JSON.stringify(mat)], { type: 'application/json' }));


    this.categoryService.save(formData, "/theme/save").subscribe({
      next: (response) => {
        Display.alert(this.alert, "Sent successfully", "close", 3000, "success-snackbar");
        localStorage.removeItem('info');
      },
      error: (exception) => {
        console.log(exception);
        Display.alert(this.alert, (exception.error.message), "close", 6000);
      }
    });


  }

  patchData(materielsList: any) {
    let data = Array();

    for (let i = 0; i < materielsList.length; i++) {
      const mat = materielsList[i];
      if(mat.checked && mat.count != 0) {
        const item = {
          id_materiel : mat.id_materiel,
          count : mat.count,
          reste : mat.quantite,
        }
        data.push(item);
      }
    }

    return data;
  }

  private verifiate(info: any): boolean {
    return !Object.values(info).some(value => 
      value === null || 
      value === undefined || 
      (typeof value === 'string' && value.trim() === '')
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  getAllMateriel() {
    this.http.get(Constants.BACK_URL + '/materiel/all').subscribe({
      next:(valiny: any)=> {
        this.materielsList = valiny.data;
        this.addAttribute(this.materielsList);
      },
      error:(err) => {
        console.error(err);
      }
    });
  }


  addAttribute(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].initialQuantite = data[i].quantite;
      data[i].checked = false;
      data[i].count = 0;
    }
  }

  updateQuantity(item: any) {
    if (item.count <= 0) {
      item.count = 0;
      return;
    }

    let count = item.count;
    item.quantite = item.initialQuantite - count;

  }
}
