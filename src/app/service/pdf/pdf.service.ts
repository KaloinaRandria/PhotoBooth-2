import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../../class/util/constants";

@Injectable({
  providedIn: 'root'
})
export class PdfService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  export(table: string): Observable<any> {
    const api = Constants.EXPORT_TABLE_API + "/" + table;
    return this.req(null, api, 'get');
  }
}
