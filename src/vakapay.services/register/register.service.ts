import { Injectable } from '@angular/core';

import { Register } from 'model/authenticate/Register';
import { HttpService } from 'network/http/http.service';
import { ResultObject } from 'model/result/ResultObject';

@Injectable({ providedIn: 'root' })

export class RegisterService {
  private registerUrl = '/api/register';  // URL to web api

  constructor(
    private httpService: HttpService,
  ) { }

  /** POST: register for user to the server */
  register(mRegister: Register): Promise<ResultObject> {
    let operation = 'register';
    let api = this.registerUrl;
    let data = mRegister;
    return this.httpService.post(operation, api, data);
  }

}
