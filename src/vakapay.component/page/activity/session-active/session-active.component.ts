import { Component } from '@angular/core';
import { WebSessionService }
  from 'services/activity/web-session.service';
import { MatTableDataSource } from '@angular/material';
import { WebSession } from 'model/activity/WebSession';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-session-active',
  templateUrl: './session-active.component.html',
})
export class SessionActiveComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'signedIn', 'browser', 'userIp', 'address', 'current', 'delete'
  ];

  constructor(
    private webSessionService: WebSessionService,
    breakpointObserver: BreakpointObserver
    ) {
    this.webSessionService.getList();
    this.dataSource = new MatTableDataSource<WebSession>(this.webSessionService.listWebSession);

    breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['signedIn', 'browser', 'userIp', 'address', 'current', 'delete'] :
        ['signedIn', 'browser', 'userIp', 'address', 'current', 'delete'];
    });
  }

  refresh() {
    this.webSessionService.getList();
  }

  delete(id) {
    alert(id);
  }
}
