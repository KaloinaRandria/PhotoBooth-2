import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesBoothService extends BaseService{

  constructor(http : HttpClient) {
    super(http);
  }
  getAll(api : string) {
    return this.req(null,api,'get');
  }
}
