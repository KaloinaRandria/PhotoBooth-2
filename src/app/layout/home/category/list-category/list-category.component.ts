import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../../service/category/category.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModifyCategComponent} from "./modify-categ/modify-categ.component";
import {Navigation} from "../../../../class/util/navigation";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categoriesInitial: any[] = [];
  categories: any[] = [];

  filter: any = {
    intitule: ''
  };

  page: number = 1;
  maxPage: number = 1;

  constructor(private categoryService: CategoryService,private snackbar:MatSnackBar,private dialog: MatDialog) {}

  next() {
    this.page = this.page + 1;
    this.categories = Navigation.paginate(this.categoriesInitial, this.page);
  }

  previous() {
    this.page = this.page - 1;
    this.categories = Navigation.paginate(this.categoriesInitial, this.page);
  }

  popUp(categorie: any) {
    const dialogRef = this.dialog.open(ModifyCategComponent, {
      data: {categ: categorie}
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const url = `/categ/all`;
    console.log('Fetching categories from:', url);
    this.categoryService.getAll(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.categoriesInitial = response.data;
          this.categories = Navigation.paginate(this.categoriesInitial, this.page);
          this.maxPage = Navigation.maxPage(this.categoriesInitial);
        } else {
          console.error('Failed to fetch categories');
        }
      },
      (error) => {
        console.error('Error fetching categories', error);
        Display.alert(this.snackbar,'error',"close",6000);
      }
    );
  }

  delete(categorie:any):void{
    const url='/categ/delete/'+categorie.id_categorie_theme;
    this.categoryService.delete(url).subscribe(
      (response:any) =>{
        if(response.success){
          const index = this.categories.findIndex(cat => cat.id_categorie_theme === categorie.id_categorie_theme);
          Display.alert(this.snackbar,"Deleted succesfully","close",3000,"succes-snackbar");
          this.categories.splice(index,1);
        } else{
          console.error('Failed to delete category')
        }
      },
      (error)=>{
        console.error(error);
        Display.alert(this.snackbar,'error',"close",6000);
      }
    );
  }

  filterPro(
    categList: any[],
    filter: any
  ): any[] {
    return categList.filter(categ => {
      const matchesIntitule = filter.intitule && filter.intitule !== ''
        ? categ.intitule.toLowerCase().includes(filter.intitule.toLowerCase())
        : true;
      return matchesIntitule;
    });
  }

  filterFunc() {
    const filterTab = this.filterPro(this.categoriesInitial, this.filter);
    this.categories = filterTab;
  }

  initial() {
    this.categories = Navigation.paginate(this.categoriesInitial, this.page);
  }
}
