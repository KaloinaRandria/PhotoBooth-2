import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../class/util/constants';

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrl: './list-theme.component.css'
})
export class ListThemeComponent implements OnInit {

  themeList: any[] = []
  ngOnInit(): void {
      
  }

  constructor(private http: HttpClient) {
    this.getAllTheme();
  }

  getAllTheme() {
    this.http.get(Constants.BACK_URL + '/theme/all').subscribe({
      next:(valiny: any)=> {
        this.themeList = valiny.data;
        console.log(this.themeList);
      },
      error:(err) => {
        console.error(err);
      }
    });
  }
}
