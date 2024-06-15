import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../../service/category/category.service";
import {Constants} from "../../../../class/util/constants";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private categoryService: CategoryService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const url = `/categ/all`;
    console.log('Fetching categories from:', url);
    this.categoryService.getAll(url).subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
          this.categoriesInitial = response.data;
          console.log(this.categories);
        } else {
          console.error('Failed to fetch categories');
        }
      },
      (error) => {
        console.error('Error fetching categories', error);
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
        Display.alert(this.snackbar,error,"close",6000);
      }
    );
  }

  filterPro(
      categList: any[],
      filter: any
  ): any[] {
    return categList.filter(categ => {
      const matchesIntitule = filter.intitule && filter.intitule !== '' ? categ.intitule.includes(filter.intitule) : true;
      return (
          matchesIntitule
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterPro(this.categoriesInitial, this.filter);
    this.categories = filterTab;
  }

  initial() {
    this.categories = this.categoriesInitial;
  }
}
