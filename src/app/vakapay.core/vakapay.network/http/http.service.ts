import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message/message.service';

import { ResultObject } from '../../../vakapay.model/result/ResultObject';
import { ConfigService } from '../config/config.service';

var httpOptionsPost = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  }),
  withCredentials: true
};

var httpOptionsGet = { withCredentials: true };

@Injectable({ providedIn: 'root' })

export class HttpService {
  private url = '';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private messageService: MessageService
  ) {
    this.url = this.configService.url;
  }

  //Get api
  get(operation = 'operation', api): Promise<any> {
    var self = this;
    return new Promise<any>((resolve, reject) => self.http.get(self.url + api, httpOptionsGet)
      .subscribe(
        data => {
          self.handleSuccess(operation, data);
          resolve(new ResultObject(data));
        },
        error => {
          self.handleError(operation, error);
          reject(error);
        }
      ));
  };

  //Post api
  post(operation = 'operation', api, data): Promise<any> {
    var self = this;
    return new Promise<any>((resolve, reject) => {
      self.http.post(self.url + api, data, httpOptionsPost)
        .subscribe(
          data => {
            self.handleSuccess(operation, data);
            resolve(new ResultObject(data));
          },
          error => {
            self.handleError(operation, error);
            reject(error);
          }
        );
    });
  };

  private log(message: string) {
    this.messageService.add(`HttpService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param error 
   */
  private handleError(operation = 'operation', error) {
    console.log(error); // log to console instead
    // TODO: 
    this.log(`${operation} failed: ${error.message}`);
  }

  /**
 * Handle Http operation that success.
 * @param operation - name of the operation that success
 * @param result 
 */
  private handleSuccess(operation = 'operation', data) {
    // 
    console.log(data); // log to console instead
    // TODO: 
    this.log(`${operation} success: ${data.message}`);
  }
}
