import { Root } from 'component/root/root.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent extends Root { 

  constructor(
    titleService: Title,
    route: ActivatedRoute,
    router: Router,
  ) {
    super(titleService, route, router);    
  }
}
