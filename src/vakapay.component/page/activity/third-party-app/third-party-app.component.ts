import { Component } from '@angular/core';
import { ThirdPartyAppService } from 'services/activity/third-party-app.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'third-party-app',
  templateUrl: './third-party-app.component.html',
  styleUrls: ['./third-party-app.component.css']
})
export class ThirdPartyAppComponent {
  displayedColumns: string[] = [
    'application', 'permissions', 'whenFormat'
  ];

  constructor(
    public service: ThirdPartyAppService,
    breakpointObserver: BreakpointObserver
  ) {
    this.service.getList();

    breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['application', 'permissions', 'whenFormat'] :
        ['application', 'permissions', 'whenFormat'];
    });
  }

  refresh() {
    this.service.getList();
  }

  delete(id) {
    alert(id);
  }

}
