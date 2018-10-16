import { Component } from '@angular/core';
import { WebSessionService } from 'services/activity/web-session.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-session-active',
  templateUrl: './session-active.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionActiveComponent {
  displayedColumns: string[] = [
    'signedInFormat', 'browser', 'ip', 'location', 'current', 'delete'
  ];

  constructor(
    public service: WebSessionService,
    breakpointObserver: BreakpointObserver
  ) {
    this.service.getList();

    breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['signedInFormat', 'browser', 'ip', 'location', 'current', 'delete'] :
        ['signedInFormat', 'browser', 'ip', 'location', 'current', 'delete'];
    });
  }

  refresh() {
    this.service.getList();
  }

  async delete(id) {
    let result = await this.service.delete({
      Id: id
    })
  }
}
