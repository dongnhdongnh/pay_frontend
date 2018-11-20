import { Component } from '@angular/core';
import { ApiAccessService } from 'services/api-access/apiAccess.service';
import { ApiKeyService } from 'services/api-access/api-key/apiKey.service';

@Component({
  selector: 'app-list-api-keys',
  templateUrl: './list-api-keys.component.html',
  styleUrls: ['./list-api-keys.component.css']
})
export class ListApiKeysComponent {
  displayedColumns: string[] = ['keyApi', 'status', 'wallets', 'permissions', 'action'];
  showPermission: any = {};
  service: ApiKeyService;

  constructor(
    service: ApiKeyService,
    public apiAccessService: ApiAccessService
  ) {
    this.service = service;
    this.service.getList();
  }

  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var element = target.closest(".verified");

    if (!element) return;

    var parent = element.closest('mat-cell');
    this.service.currentId = parent.attributes.id.nodeValue;
  }

  refresh() { this.service.refresh(); }
}
