import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../service/form/form.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../../../class/util/display";
import {RoleService} from "../../../../service/form/role.service";
import {Constants} from "../../../../class/util/constants";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-insert-staff',
  templateUrl: './insert-staff.component.html',
  styleUrl: './insert-staff.component.css'
})
export class InsertStaffComponent implements OnInit{
  form : FormGroup;
  roleList : any[]=[];
  posteList : any[]=[];
  constructor(private fBuilder : FormBuilder , private formService : FormService , private snackBar : MatSnackBar , private roleService : RoleService , private http : HttpClient) {
     this.form = fBuilder.group({
       prenom : [''],
       nom : [''],
       username : [''],
       dtn : [''],
       mail : [''],
       mdp : [''],
       role : [''],
       post : [''],
       date_embauche : [''],
       salaire : ['']
     })
   }

   ngOnInit() {
    this.getRole();
    this.getPoste();
   }
   submitForm() {
    const data ={
      prenom : this.form.get('prenom')?.value,
      nom : this.form.get('nom')?.value,
      username : this.form.get('username')?.value,
      mail : this.form.get('mail')?.value,
      mot_de_passe : this.form.get('mdp')?.value,
      date_embauche : this.form.get('date_embauche')?.value,
      role : {
        id_role : this.form.get('role')?.value
      },
      poste : {
        id_poste : this.form.get('post')?.value
      },
      date_de_naissance : this.form.get('dtn')?.value
    };
    console.log(data);
    this.formService.formulaireSend(data).subscribe({
      next:()=> {
        Display.alert(this.snackBar , "Sended Succesfully","close",3000,"succes-snackbar");
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
      }
    });
   }
   getRole() {
      this.roleService.getAll().subscribe({
        next:(response:any) => {
          console.log(response.data);
          this.roleList = response.data;
        },
        error:(exception) => {
          Display.alert(this.snackBar,(exception.error.message),"close",6000);
          console.log(exception);
        }
      });
   }

   getPoste() {
      this.http.get(Constants.BACK_URL + '/poste/all').subscribe({
        next:(response:any) => {
          console.log(response.data);
          this.posteList = response.data;
        },
        error:(exception) => {
          Display.alert(this.snackBar,(exception.error.message),"close",6000);
          console.log(exception);
        }
      });
   }

}
