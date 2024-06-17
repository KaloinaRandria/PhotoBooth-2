import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../class/model/user/user";
import {Observable} from "rxjs";
import {Constants} from "../../class/util/constants";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  upload(formData: FormData): Observable<any> {
    const api = Constants.UPLOAD_API;
    return this.req(formData, api, 'post');
  }

  uploadCsv(formData: FormData): Observable<any> {
    const api = Constants.UPLOAD_CSV_API;
    return this.req(formData, api, 'post');
  }

  uploadCsvTable(formData: FormData): Observable<any> {
    const api = Constants.UPLOAD_CSV_TABLE_API;
    return this.req(formData, api, 'post');
  }

  getAllUser(): Observable<any> {
    const api = Constants.ALL_USER_API;
    return this.req(null, api, 'get');
  }

  getAllTheme(api: string) {
    return this.req(null, api, 'get');
  }

}
