import { Component, OnInit, Input } from '@angular/core';
import { Utility } from 'utility/Utility';

@Component({
  selector: 'button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent {
  @Input() service: any = '';
  @Input() id: string = '';
  isLoading: boolean = false;
  constructor() { }

  async delete() {
    while (this.id === '') {
      await Utility.sleep(100);
    }
    this.isLoading = true;
    let result = await this.service.delete({
      Id: this.id
    })
    this.isLoading = false;
    if (Utility.isSuccess(result)) {
      this.service.refresh();
      return;
    }

    return;
  }
}
