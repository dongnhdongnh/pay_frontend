import { ReportService } from 'services/tools/report.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  @ViewChild('cancel') cancelElement: ElementRef;

  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(private service: ReportService) { }

  validate() {
    this.isValid = true;
  }

  onReset(){

  }

  onCloseModal(){
    this.cancelElement.nativeElement.click();
  }

  async onUpdate() {
    try {
      this.validate();
      if (this.isValid === false || this.isLoading === true) return;
      this.isLoading = true;


      var dataPost = {
        "networkName": "Ethereum",
        "dayTime": 100,
        "email": "dongnhdongnh@gmail.com"
      };

      //send ajax
      let result = await this.service.new(dataPost);

      //Show message success
      this.isLoading = false;

      if (Utility.isError(result)) return;

      this.onReset();
      this.onCloseModal();

      return;
    } catch (error) {
      //Show message success
      this.isLoading = false;
      console.log(JSON.stringify(error));
    }
  }
}
