import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService{

  constructor(protected override http : HttpClient) {
    super(http);
  }

  formulaireSend(formBody : any):Observable<any> {
    const api = 'client/save';
    return this.req(formBody, api , 'post');
  }

  getAll(api : string) {
    return this.req(null,api,'get');
  }
}
