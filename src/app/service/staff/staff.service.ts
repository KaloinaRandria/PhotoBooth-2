import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService{

   constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(api : string) {
    console.log(api);
    return this.req(null , api,'get');
  }
  delete(api:string):Observable<any>{
    return this.req(null,api,'delete');
  }
}
