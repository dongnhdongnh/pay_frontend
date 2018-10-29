import { Component, OnInit } from '@angular/core';
import { HttpService } from 'network/http/http.service';
import { ConfigService } from 'network/config/config.service';
import { Activity } from 'model/activity/activity.ts'
@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit {
  configService: ConfigService;
  private apiUrl = '';
  portfolioValue = '';
  activities: Activity[] = [];

  constructor(private httpService: HttpService, configService: ConfigService) {
    this.configService = configService;
    this.apiUrl = this.configService.urlApi + '/api/recentActivity/transactions/';
  }

  ngOnInit() {
    this.getData('10');
  }

  showModal(activity) {
    alert(JSON.stringify(activity));
    //show any modal
  }

  public async getData(apiString = '') {
    var apiData = await this.httpService.getFrom("get coinmarket data", this.apiUrl + apiString);

    // if (Utility.isError) throw new Error(apiData.message);
    var objectData = apiData.data;
    objectData.forEach(element => {
      var value = Number(element["Value"]).toFixed(3).toString();

      var activity = new Activity(element["TimeStamp"], element["IsSend"], element["NetworkName"],
        element["FromAddress"], element["ToAddress"], element["Amount"], value,
        element["Hash"], element["Price"], element["BlockNumber"], element["Status"]);

      this.activities.push(activity);
    });
  }

}
