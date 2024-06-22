import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { PopUpEditRecordComponent } from './pop-up-edit-record/pop-up-edit-record.component';
import { RecordService } from "../../../../service/record/record.service";
import { Constants } from "../../../../class/util/constants";
import { Display } from "../../../../class/util/display";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent implements OnInit {
  records: any[] = [];
  initialRecords: any[] = [];
  filter: any = {
    label: '',
    coutmin: '',
    coutmax: '',
    datemin: '',
    datemax: ''
  };

  constructor(private dialog: MatDialog, private recordService: RecordService, private snackbar: MatSnackBar) {}

  popUp(record: any) {
    const dialogRef = this.dialog.open(PopUpEditRecordComponent, {
      data: { record }
    });
  }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.recordService.getAll('/depense/all').subscribe({
      next: (valiny: any) => {
        this.records = valiny.data;
        this.initialRecords = valiny.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(record: any) {
    const url = '/materiel/delete/' + record.idDepense;
    this.recordService.delete(url).subscribe(
      (response: any) => {
        if (response.success) {
          const index = this.records.findIndex(ro => ro.idDepense === record.idDepense);
          Display.alert(this.snackbar, "Deleted successfully", "close", 3000, "succes-snackbar");
          this.records.splice(index, 1);
        } else {
          Display.alert(this.snackbar, 'Failed to delete material', "close", 6000);
        }
      },
      (error) => {
        console.error(error);
        Display.alert(this.snackbar, error.error.message, "close", 6000);
      }
    );
  }

  filterRecord(
    recordList: any[],
    filter: any
  ): any[] {
    return recordList.filter(record => {
      const matchesLabel = filter.label && filter.label !== '' ? record.libele.toLowerCase().includes(filter.label.toLowerCase()) : true;
      const matchesCoutMin = filter.coutmin && filter.coutmin !== '' ? record.montant >= Number(filter.coutmin) : true;
      const matchesCoutMax = filter.coutmax && filter.coutmax !== '' ? record.montant <= Number(filter.coutmax) : true;
      let matchesStartDate = true;
      let matchesEndDate = true;

      if (filter.datemin && filter.datemin !== '') {
        matchesStartDate = new Date(record.date_insertion) >= new Date(filter.datemin);
      }

      if (filter.datemax && filter.datemax !== '') {
        matchesEndDate = new Date(record.date_insertion) <= new Date(filter.datemax);
      }

      return (
        matchesLabel &&
        matchesCoutMin &&
        matchesCoutMax &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }

  filterFunc() {
    const filterTab = this.filterRecord(this.initialRecords, this.filter);
    this.records = filterTab;
  }

  initial() {
    this.records = this.initialRecords;
  }
}
