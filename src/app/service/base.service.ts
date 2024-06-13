import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Constants} from "../class/util/constants";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected http: HttpClient) { }

  req(data: any, url: string, method: string): Observable<any> {
    const api = Constants.BACK_URL + url;
    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get<any>(api);
      case 'post':
        return this.http.post<any>(api, data);
      case 'put':
        return this.http.put<any>(api, data);
      case 'delete':
        return this.http.delete<any>(api);
      case 'patch':
        return this.http.patch<any>(api, data);
      case 'head':
        return this.http.head<any>(api);
      case 'options':
        return this.http.options<any>(api);
      default:
        throw new Error(`Méthode HTTP non prise en charge : ${method}`);
    }
  }
}
