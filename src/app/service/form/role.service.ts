import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../class/util/constants";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    const api = '/role/all';
    console.log(api);
    return this.req(null , api,'get');
  }
}
