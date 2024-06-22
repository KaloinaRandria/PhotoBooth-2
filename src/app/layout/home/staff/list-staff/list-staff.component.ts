import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../../service/staff/staff.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Constants} from "../../../../class/util/constants";
import {HttpClient} from "@angular/common/http";
import {RoleService} from "../../../../service/form/role.service";
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrl: './list-staff.component.css'
})
export class ListStaffComponent implements OnInit{
  initialStaff: any[]=[];
  staff : any[]=[];
  posteList: any[] = [];
  roleList: any[] = [];

  filter:any = {
    username:'',
    ageMin: '',
    ageMax: '',
    poste: '',
    role: '',
    salaire: ''
  };

  ngOnInit() {
    this.getAllStaff();
    this.getAllPoste();
    this.getAllRole();
  }

  constructor(private staffService : StaffService , private snackBar : MatSnackBar, private http: HttpClient, private roleService: RoleService,private dialog: MatDialog) {
  }

  popUp(staff: any) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: {staff:staff, roleList: this.roleList, posteList: this.posteList }
    });
  }
  getAllStaff():void {
    const api = '/membre/all';
    this.staffService.getAll(api).subscribe({
      next:(response: any) => {
      if (response.success) {
        this.staff = response.data;
        this.initialStaff = response.data;
      }  else {
        Display.alert(this.snackBar,(response.message),"close",6000);
      }
    },
      error:(exception) => {
        Display.alert(this.snackBar, (exception.error.message), "close", 6000);
      }
    });

  }

  getSalaire(salaire: any) {
    if (salaire) {
      return salaire.montant;
    }
    return "not set";
  }

  getAllPoste() {
    this.http.get(Constants.BACK_URL + '/poste/all').subscribe({
      next:(response:any) => {
        this.posteList = response.data;
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
        console.error(exception);
      }
    });
  }

  getAllRole() {
    this.roleService.getAll().subscribe({
      next:(response:any) => {
        this.roleList = response.data;
      },
      error:(exception) => {
        Display.alert(this.snackBar,(exception.error.message),"close",6000);
        console.error(exception);
      }
    });
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  filterStaff(
      staffList: any[],
      filter: any
  ): any[] {
    return staffList.filter(staff => {
      const age = this.calculateAge(staff.date_de_naissance);

      const matchesUsername = filter.username && filter.username !== '' ? staff.username.includes(filter.username) : true;
      const matchesAgeMin = filter.ageMin && filter.ageMin !== '' ? age >= Number(filter.ageMin) : true;
      const matchesAgeMax = filter.ageMax && filter.ageMax !== '' ? age <= Number(filter.ageMax) : true;
      const matchesSalaire = filter.salaire && filter.salaire !== '' ?
          (staff.salaire && staff.salaire.montant === Number(filter.salaire)) : true;

      let matchesRoleIntitule = true;
      if (filter.role && filter.role !== '') {
        matchesRoleIntitule = staff.role.id_role.includes(filter.role);
      }

      let matchesPosteIntitule = true;
      if (filter.poste && filter.poste !== '') {
        matchesPosteIntitule = staff.poste.id_poste.includes(filter.poste);
      }

      return (
          matchesUsername &&
          matchesAgeMin &&
          matchesAgeMax &&
          matchesRoleIntitule &&
          matchesPosteIntitule &&
          matchesSalaire
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterStaff(this.initialStaff, this.filter);
    this.staff = filterTab;
  }

  initial() {
    this.staff = this.initialStaff;
  }
}

