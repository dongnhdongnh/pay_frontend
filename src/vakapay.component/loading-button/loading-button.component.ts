import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-button',
  templateUrl: './loading-button.component.html',
})
export class LoadingButtonComponent {
  @Input() isLoading: boolean;
  
}
