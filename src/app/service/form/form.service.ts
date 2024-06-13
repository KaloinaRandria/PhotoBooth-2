import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../../class/util/constants";

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  formulaireSend(formBody: any): Observable<any> {
    const api = '/membre/save';
    return this.req(formBody, api, 'post');
  }
}
