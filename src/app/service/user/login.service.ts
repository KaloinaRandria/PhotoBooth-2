import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from "../base.service";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  login(data : any , api : string): Observable<any> {
    return this.req(data , api , 'post');
  }


}
