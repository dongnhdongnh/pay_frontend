import { Utility } from 'utility/Utility';
import { Component } from '@angular/core';

@Component({
  selector: 'waiting-load-page',
  templateUrl: './waiting-load-page.component.html',
  styleUrls: ['./waiting-load-page.component.css']
})
export class WaitingLoadPageComponent {
  percent: number = 0;
  constructor() {
    this.setPercent();
  }

  async setPercent() {
    while (this.percent < 99) {
      this.percent += 1;
      await Utility.sleep(50);
    }
  }

}
