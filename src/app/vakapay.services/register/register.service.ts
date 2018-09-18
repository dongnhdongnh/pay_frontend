import { Injectable } from '@angular/core';

import { Register } from '../../vakapay.model/authenticate/Register';
import { HttpService } from '../../vakapay.core/vakapay.network/http/http.service';



@Injectable({ providedIn: 'root' })

export class RegisterService {
  private registerUrl = '/api/register';  // URL to web api

  constructor(
    private httpService: HttpService,
  ) {

  } 

  /** POST: register for user to the server */
  register(mRegister: Register) {
    let operation = 'register';
    let api = this.registerUrl;
    let data = mRegister;
    return this.httpService.post(operation, api, data);
  }

}
