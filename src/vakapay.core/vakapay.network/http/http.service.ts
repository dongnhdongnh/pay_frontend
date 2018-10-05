import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'network/message/message.service';

import { ToasterService } from 'angular2-toaster';

import { ResultObject } from 'model/result/ResultObject';
import { ConfigService } from 'network/config/config.service';
import { AlertService } from 'services/system/alert.service';
import { Utility } from 'utility/Utility';
const token = localStorage.getItem('token');
var httpOptionsPost = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }),
  withCredentials: true
};

var httpOptionsPostFormData = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${token}`
  }),
  withCredentials: true
};

var httpOptionsGet = { withCredentials: true };

@Injectable({ providedIn: 'root' })
export class HttpService {
  private url = '';
  private alertService: AlertService;
  configService: ConfigService;

  constructor(
    private http: HttpClient,
    configService: ConfigService,
    private messageService: MessageService,
    alertService: AlertService
  ) {
    this.configService = configService;
    this.url = this.configService.url;
    this.alertService = alertService;
  }

  //Get api
  get(operation = 'operation', api): Promise<ResultObject> {
    var self = this;
    return new Promise<ResultObject>((resolve, reject) => self.http.get(self.url + api, httpOptionsGet)
      .subscribe(
        data => {
          let dataConvert = new ResultObject(data);
          self.handleSuccess(operation, dataConvert);
          resolve(dataConvert);
        },
        error => {
          self.handleError(operation, error);
          reject(error);
        }
      ));
  };

  //Post api
  actionPost(operation = 'operation', api, data, httpOptions): Promise<ResultObject> {
    var self = this;
    return new Promise<ResultObject>((resolve, reject) => {
      self.http.post(self.url + api, data, httpOptions)
        .subscribe(
          data => {
            let dataConvert = new ResultObject(data);
            self.handleSuccess(operation, dataConvert);
            resolve(dataConvert);
          },
          error => {
            self.handleError(operation, error);
            reject(error);
          }
        );
    });
  };

  //Post api
  post(operation, api, data): Promise<ResultObject> {
    return this.actionPost(operation, api, data, httpOptionsPost);
  };

  //Post api
  postFormData(operation, api, data): Promise<ResultObject> {
    return this.actionPost(operation, api, data, httpOptionsPostFormData);
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
    this.alertService.showToastError(JSON.stringify(error));
  }

  /**
 * Handle Http operation that success.
 * @param operation - name of the operation that success
 * @param result 
 */
  private handleSuccess(operation = 'operation', data: ResultObject) {
    // 
    console.log(data); // log to console instead
    // TODO: 
    this.log(`${operation} success: ${data.message}`);
    //Check result
    if (Utility.isError(data)) {
      this.alertService.showToastError(data.message);
      return;
    }
    this.alertService.showToastSuccess(data.message);
  }
}
