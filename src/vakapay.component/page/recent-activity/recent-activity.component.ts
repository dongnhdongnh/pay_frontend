import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { Activity } from 'model/activity/activity'
@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit, AfterViewInit {
  activity = {
    modal: {}
  };
  modalName = 'modalActivityDetail';
  isLoading = true;

  ngAfterViewInit(): void {
    this.activity = {
      modal: this.ngxSmartModalService.getModal(this.modalName),
    }
  }
  showModal(activity) {
    this.activity = activity;
    this.ngxSmartModalService.getModal(this.modalName).open();
  }

  configService: ConfigService;
  private apiUrl = '';
  portfolioValue = '';
  activities: Activity[] = [];

  constructor(private httpService: HttpService, configService: ConfigService, public ngxSmartModalService: NgxSmartModalService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/recentActivity/transactions/';
  }

  ngOnInit() {
    var self = this;
    this.getData('10');
    setInterval(function(){
      self.getData('10');
    }, 5 * 60 * 1000);
  }

  public async getData(apiString = '') {
    this.activities.length = 0;
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);

    if (apiData && apiData.data){
      var objectData = apiData.data;
      objectData.forEach(element => {
        var value = Number(element["Value"]).toFixed(3).toString();

        var activity = new Activity(element["TimeStamp"], element["IsSend"], element["NetworkName"],
          element["FromAddress"], element["ToAddress"], element["Amount"], value,
          element["Hash"], element["Price"], element["BlockNumber"], element["Status"]);

        this.activities.push(activity);
      });
    }
    this.isLoading = false;
  }

}
