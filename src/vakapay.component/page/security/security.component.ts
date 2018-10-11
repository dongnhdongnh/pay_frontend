import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Root } from 'component/root/root.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
})
export class SecurityComponent extends Root {

  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(titleService, route, router);
  }
}