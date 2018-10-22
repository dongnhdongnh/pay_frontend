import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ConfirmedDeviceService } from 'services/activity/confirmed-device.service';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'app-confirmed-devices',
  templateUrl: './confirmed-devices.component.html',
  styleUrls: ['./confirmed-devices.component.css']
})
export class ConfirmedDevicesComponent {

  displayedColumns: string[] = [
    'signedInFormat', 'browser', 'ip', 'location', 'current', 'delete'
  ];

  constructor(
    public service: ConfirmedDeviceService,
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

}
