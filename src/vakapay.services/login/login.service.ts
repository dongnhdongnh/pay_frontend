import { Injectable } from '@angular/core';

import { Login } from 'model/authenticate/Login';
import { HttpService } from 'network/http/http.service';
import { ResultObject } from 'model/result/ResultObject';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginUrl = '/api/login';  // URL to web api

  constructor(
    private httpService: HttpService,
  ) { }

  /** POST: login for user to the server */
  login(mLogin: Login): Promise<ResultObject> {
    let operation = 'login';
    let api = this.loginUrl;
    let data = mLogin;
    return this.httpService.post(operation, api, data);
  }
}
