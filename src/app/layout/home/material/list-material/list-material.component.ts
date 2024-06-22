import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { Constants } from '../../../../class/util/constants';
import { HttpClient } from '@angular/common/http';
import { AddComponent } from './add/add.component';
import {Display} from "../../../../class/util/display";
import {MaterialService} from "../../../../service/material/material.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrl: './list-material.component.css'
})
export class ListMaterialComponent implements OnInit {
  materiels: any[] = [];
  initialMat: any[] = [];

  filter: any = {
    intitule:'',
    min: '',
    max:''
  }

  ngOnInit(): void {
    this.getAllMateriel();
  }

  constructor(private dialog: MatDialog, private http : HttpClient,private materielService:MaterialService,private snackbar:MatSnackBar) {
  }

  popUp(item: any) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '100vh',
      height:'90vh',
      data: {item}
    });
  }

  getAllMateriel() {
    this.http.get(Constants.BACK_URL + '/materiel/all').subscribe({
      next:(valiny: any)=> {
        this.materiels = valiny.data;
        this.initialMat = valiny.data;
      },
      error:(err) => {
        console.error(err);
      }
    });
  }

  filterStaff(
    matList: any[],
    filter: any
  ): any[] {
    return matList.filter(mat => {

      const matchesIntitule = filter.intitule && filter.intitule !== '' ? mat.intitule.includes(filter.intitule) : true;
      const matchesMin = filter.min && filter.min !== '' ? mat.prix >= Number(filter.min) : true;
      const matchesMax = filter.max && filter.max !== '' ? mat.prix <= Number(filter.max) : true;


      return (
        matchesIntitule &&
        matchesMin &&
        matchesMax
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterStaff(this.initialMat, this.filter);
    this.materiels = filterTab;
  }

  initial() {
    this.materiels = this.initialMat;
  }
  delete(material:any){
    const url='/materiel/delete/'+material.id_materiel;
    this.materielService.delete(url).subscribe(
      (response:any) =>{
        if(response.success){
          const index = this.materiels.findIndex(ro => ro.id_categorie_theme === material.id_materiel);
          Display.alert(this.snackbar,"Deleted succesfully","close",3000,"succes-snackbar");
          this.materiels.splice(index,1);
        } else{
          Display.alert(this.snackbar,'Failed to delete material',"close",6000);
        }
      },
      (error)=>{
        console.error(error);
        Display.alert(this.snackbar,error.error.message,"close",6000);
      }
    );
  }
}
