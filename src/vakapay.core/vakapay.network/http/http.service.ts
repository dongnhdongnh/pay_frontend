import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'network/message/message.service';
import { ResultObject } from 'model/result/ResultObject';
import { ConfigService } from 'network/config/config.service';
import { AlertService } from 'services/system/alert.service';
import { Utility } from 'utility/Utility';
import { environment } from 'environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class HttpService {
  public url = '';
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

  httpOptionsPost() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      withCredentials: true
    };
  }

  httpOptionsPostImgur() {
    return {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        // 'Authorization': `Client-ID be5056dfe342377`
      }),
      withCredentials: true
    };
  }

  httpOptionsPostFormData() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      withCredentials: true
    };
  }

  httpOptionsGet() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      withCredentials: true
    };
  }

  //Get api
  get(operation = 'operation', api, alert = true): Promise<ResultObject> {
    let URL_API = new URL(api, this.url).href;
    return this.requestGet(operation, URL_API, alert);
  };

  manualGet(URL_api) {
    var self = this;
    return new Promise<ResultObject>(
      (resolve, reject) => self.http.get(URL_api, self.httpOptionsGet())
        .subscribe(
          data => {
            let dataConvert = new ResultObject(data);
            //  self.handleSuccess(operation, URL_API, dataConvert, alert);
            resolve(dataConvert);
          },
          error => {
            // self.handleError(operation, URL_API, error, alert);
            reject(error);
          }
        ));
  }
  requestGet(operation = 'operation', URL_API, alert = true) {
    var self = this;
    return new Promise<ResultObject>(
      (resolve, reject) => self.http.get(URL_API, self.httpOptionsGet())
        .subscribe(
          data => {
            let dataConvert = new ResultObject(data);
            self.handleSuccess(operation, URL_API, dataConvert, alert);
            resolve(dataConvert);
          },
          error => {
            self.handleError(operation, URL_API, error, alert);
            reject(error);
          }
        ));
  }

  requestPost(operation = 'operation', URL_API, data, httpOptions, alert = true) {
    var self = this;
    return new Promise<ResultObject>((resolve, reject) => {
      self.http.post(URL_API, data, httpOptions)
        .subscribe(
          data => {
            let dataConvert = new ResultObject(data);
            self.handleSuccess(operation, URL_API, dataConvert, alert);
            resolve(dataConvert);
          },
          error => {
            self.handleError(operation, URL_API, error, alert);
            reject(error);
          }
        );
    });
  }

  //Post api
  actionPost(operation = 'operation', api, data, httpOptions, alert = true): Promise<ResultObject> {
    let URL_API = new URL(api, this.url).href;
    return this.requestPost(operation, URL_API, data, httpOptions, alert);
  };

  //Get api
  getFrom(operation = 'operation', api, alert = true): Promise<ResultObject> {
    var self = this;
    return new Promise<ResultObject>((resolve, reject) => self.http.get(api, self.httpOptionsGet())
      .subscribe(
        data => {
          let dataConvert = new ResultObject(data);
          // self.handleSuccess(operation, dataConvert, alert);
          resolve(dataConvert);
        },
        error => {
          self.handleError(operation, api, error, alert);
          reject(error);
        }
      ));
  };

  //Post api
  post(operation, api, data, alert = true, debug = false): Promise<ResultObject> {
    return this.actionPost(operation, api, data, this.httpOptionsPost(), alert);
  };

  //Post api
  postFormData(operation, api, data, alert = true): Promise<ResultObject> {
    return this.actionPost(operation, api, data, this.httpOptionsPostFormData(), alert);
  };

  //Send image to imgur.com
  postImgur(operation, api, data, alert = true): Promise<ResultObject> {
    let URL_API = `${window.location.origin}/upload-profile`;
    return this.requestPost(operation, URL_API, data, this.httpOptionsPostImgur(), alert);
  };

  private log(message: string) {
    this.messageService.add(`HttpService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param error 
   */
  private handleError(operation = 'operation', url: string, error, alert: boolean) {
    console.log(error); // log to console instead
    // TODO: 
    this.log(`${operation} failed: ${error.message} ${url}`);
    alert && this.alertService.showToastError(error.statusText);
  }

  /**
 * Handle Http operation that success.
 * @param operation - name of the operation that success
 * @param result 
 */
  private handleSuccess(operation = 'operation', url: string, data: ResultObject, alert: boolean) {
    // TODO: 
    this.log(`${operation} success: ${data.message} ${url}`);

    console.log(data); // log to console instead

    //Check result
    if (alert && Utility.isError(data)) {
      this.alertService.showToastError(data.message);
      return;
    }
    alert && this.alertService.showToastSuccess(data.message);
  }
}
