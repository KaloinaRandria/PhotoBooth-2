import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll(api : string): Observable<any> {
    return this.req(null , api , 'get');
  }
  save(data:any ,api:string): Observable<any>{
    return  this.req(data,api,'post');
  }
  delete(api:string):Observable<any>{
    return this.req(null,api,'delete');
  }


}
