import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseService{

  constructor(protected override http : HttpClient) {
    super(http);
  }
  save(data : any): Observable<any> {
    const api = '/reservation/save';
    return this.req(data,api,'post');
  }

}
