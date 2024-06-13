import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PosteService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    const api = '/poste/all';
    console.log(api);
    return this.req(null , api,'get');
  }
}
