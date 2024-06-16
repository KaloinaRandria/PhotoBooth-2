import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../../../service/client/client.service";
import {Display} from "../../../../class/util/display";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent implements OnInit{
  client : any[] = [];
  initialClient : any[] = [];
  filter : any = {
    prenom: '',
    nom: '',
    ageMin: '',
    ageMax: '',
    numero:''
  }
  ngOnInit() {
    this.getAllClient();
  }
  constructor(private clientService : ClientService , private snackBar : MatSnackBar) {
  }
  getAllClient():void{
    const api = '/client/all';
    this.clientService.getAll(api).subscribe({
      next:(response : any) =>{
        if (response.success) {
          this.client = response.data;
          console.log(this.client);
        } else {
          Display.alert(this.snackBar,(response.message),"close",6000);
        }
      },
      error:(exception) => {
        Display.alert(this.snackBar , (exception.error.message),"close",6000);
      }
    });
  }
  calculateAge(dateOfBirth : string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
  filterClient(
      clientList : any[],
      filter: any
  ): any[] {
    return clientList.filter(client => {
      const age = this.calculateAge(client.date_de_naissance);

      const matchesFirstName = filter.prenom && filter.prenom !== '' ? client.prenom.includes(filter.prenom) : true;
      const matchesLastName = filter.nom && filter.nom !== '' ? client.nom.includes(filter.nom) : true;
      const matchesAgeMin = filter.ageMin && filter.ageMin !== '' ? age >= Number(filter.ageMin) : true;
      const matchesAgeMax = filter.ageMax && filter.ageMax !== '' ? age <= Number(filter.ageMax) : true;
      const matchesNumero = filter.numero && filter.numero !== '' ? client.numero.includes(filter.numero) : true;

      return (
          matchesFirstName && matchesLastName &&
          matchesAgeMin && matchesAgeMax && matchesNumero
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterClient(this.initialClient, this.filter);
    this.client = filterTab;
  }
  initial() {
    this.client = this.initialClient;
  }

  delete(client:any):void {
    const api = '/client/delete/' + client.id_Client;
    this.clientService.delete(api).subscribe({
      next:(response:any)=> {
        if (response.success) {
          const index = this.client.findIndex(clt => clt.id_Client === client.id_Client);
          Display.alert(this.snackBar,"Deleted succesfully","close",3000,"succes-snackbar");
          this.client.splice(index,1);
        } else {
          console.error('Failed to delete categorie');
        }
      },
      error:(err) => {
        console.error(err);
        Display.alert(this.snackBar,err,"close",6000);
      }
    });
  }
}
