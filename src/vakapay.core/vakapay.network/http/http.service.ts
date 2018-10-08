import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'network/message/message.service';
import { ResultObject } from 'model/result/ResultObject';
import { ConfigService } from 'network/config/config.service';
import { AlertService } from 'services/system/alert.service';
import { Utility } from 'utility/Utility';
var httpOptionsPost = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }),
  withCredentials: true
};

var httpOptionsPostFormData = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }),
  withCredentials: true
};

var httpOptionsGet = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }),
  withCredentials: true
};

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
    this.url = this.configService.urlApi;
    this.alertService = alertService;
  }

  //Get api
  get(operation = 'operation', api, alert = true): Promise<ResultObject> {
    var self = this;
    return new Promise<ResultObject>(
      (resolve, reject) => self.http.get(new URL(api, self.url).href, httpOptionsGet)
        .subscribe(
          data => {
            let dataConvert = new ResultObject(data);
            self.handleSuccess(operation, dataConvert, alert);
            resolve(dataConvert);
          },
          error => {
            self.handleError(operation, error, alert);
            reject(error);
          }
        ));
  };

  //Post api
  actionPost(operation = 'operation', api, data, httpOptions, alert = true): Promise<ResultObject> {
    var self = this;
    return new Promise<ResultObject>((resolve, reject) => {
      self.http.post(new URL(api, self.url).href, data, httpOptions)
        .subscribe(
          data => {
            let dataConvert = new ResultObject(data);
            self.handleSuccess(operation, dataConvert, alert);
            resolve(dataConvert);
          },
          error => {
            self.handleError(operation, error, alert);
            reject(error);
          }
        );
    });
  };

  //Post api
  post(operation, api, data, alert = true): Promise<ResultObject> {
    return this.actionPost(operation, api, data, httpOptionsPost, alert);
  };

  //Post api
  postFormData(operation, api, data, alert = true): Promise<ResultObject> {
    return this.actionPost(operation, api, data, httpOptionsPostFormData, alert);
  };

  private log(message: string) {
    this.messageService.add(`HttpService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param error 
   */
  private handleError(operation = 'operation', error, alert: boolean) {
    console.log(error); // log to console instead
    // TODO: 
    this.log(`${operation} failed: ${error.message}`);
    alert && this.alertService.showToastError(error.statusText);
  }

  /**
 * Handle Http operation that success.
 * @param operation - name of the operation that success
 * @param result 
 */
  private handleSuccess(operation = 'operation', data: ResultObject, alert: boolean) {
    // 
    console.log(data); // log to console instead
    // TODO: 
    this.log(`${operation} success: ${data.message}`);
    //Check result
    if (alert && Utility.isError(data)) {
      this.alertService.showToastError(data.message);
      return;
    }
    alert && this.alertService.showToastSuccess(data.message);
  }
}
