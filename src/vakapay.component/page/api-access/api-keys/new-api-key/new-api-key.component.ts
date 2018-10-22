import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-new-api-key',
  templateUrl: './new-api-key.component.html',
  styleUrls: ['./new-api-key.component.css']
})
export class NewApiKeyComponent {

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  onShowModal() {
    this.ngxSmartModalService.getModal('modal').open();
  }

}
