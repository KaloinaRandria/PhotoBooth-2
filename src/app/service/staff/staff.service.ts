import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base.service";

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
}
