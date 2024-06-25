import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../../../service/client/client.service";
import { Display } from "../../../../class/util/display";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ModifyClientComponent } from "./modify-client/modify-client.component";
import {Navigation} from "../../../../class/util/navigation";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  client: any[] = [];
  initialClient: any[] = [];
  filter: any = {
    prenom: '',
    nom: '',
    ageMin: '',
    ageMax: '',
    numero: ''
  };

  page: number = 1;
  maxPage: number = 1;

  next() {
    this.page = this.page + 1;
    this.client = Navigation.paginate(this.initialClient, this.page);
  }

  previous() {
    this.page = this.page - 1;
    this.client = Navigation.paginate(this.initialClient, this.page);
  }

  ngOnInit() {
    this.getAllClient();
  }

  constructor(private clientService: ClientService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  popUp(client: any) {
    const dialogRef = this.dialog.open(ModifyClientComponent, {
      data: { client }
    });
  }

  getAllClient(): void {
    const api = '/client/all';
    this.clientService.getAll(api).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.initialClient = response.data;
          this.client = Navigation.paginate(this.initialClient, this.page);
          this.maxPage = Navigation.maxPage(this.initialClient);
        } else {
          Display.alert(this.snackBar, response.message, "close", 6000);
        }
      },
      error: (exception) => {
        Display.alert(this.snackBar, exception.error.message, "close", 6000);
      }
    });
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  filterClient(
    clientList: any[],
    filter: any
  ): any[] {
    return clientList.filter(client => {
      const age = this.calculateAge(client.date_de_naissance);

      const matchesFirstName = filter.prenom && filter.prenom !== '' ? client.prenom.toLowerCase().includes(filter.prenom.toLowerCase()) : true;
      const matchesLastName = filter.nom && filter.nom !== '' ? client.nom.toLowerCase().includes(filter.nom.toLowerCase()) : true;
      const matchesAgeMin = filter.ageMin && filter.ageMin !== '' ? age >= Number(filter.ageMin) : true;
      const matchesAgeMax = filter.ageMax && filter.ageMax !== '' ? age <= Number(filter.ageMax) : true;
      const matchesNumero = filter.numero && filter.numero !== '' ? client.numero.toLowerCase().includes(filter.numero.toLowerCase()) : true;

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
    this.client = Navigation.paginate(this.initialClient, this.page);
  }

  delete(client: any): void {
    const api = '/client/delete/' + client.id_client;
    this.clientService.delete(api).subscribe({
      next: (response: any) => {
        if (response.success) {
          const index = this.client.findIndex(clt => clt.id_client === client.id_client);
          Display.alert(this.snackBar, "Deleted successfully", "close", 3000, "succes-snackbar");
          this.client.splice(index, 1);
        } else {
          console.error('Failed to delete client');
        }
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackBar, 'Cannot delete, see logs', "close", 6000);
      }
    });
  }
}
