import { Component, Input, ElementRef, ViewChild} from '@angular/core';


@Component({
    selector: 'activity-detail',
    templateUrl: './activity-detail.component.html'
})
export class ActivityDetail{
    @ViewChild('code') codeElement: ElementRef;
    //#region init variable
    @Input() activity;

    constructor(){

    }

}