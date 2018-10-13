import { Component } from '@angular/core';
import { AccountActivityService } from 'services/activity/account-activity.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-account-activity',
  templateUrl: './account-activity.component.html',
  styleUrls: ['./account-activity.component.css']
})
export class AccountActivityComponent {

  displayedColumns: string[] = [
    'whenFormat', 'browser', 'ip', 'location', 'current', 'delete'
  ];

  constructor(
    public service: AccountActivityService,
    breakpointObserver: BreakpointObserver
  ) {
    this.service.getList();

    breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['whenFormat', 'browser', 'ip', 'location', 'current', 'delete'] :
        ['whenFormat', 'browser', 'ip', 'location', 'current', 'delete'];
    });
  }

  refresh() {
    this.service.getList();
  }

  delete(id) {
    alert(id);
  }

}
