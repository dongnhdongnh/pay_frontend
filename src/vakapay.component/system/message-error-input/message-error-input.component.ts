import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message-error-input',
  templateUrl: './message-error-input.component.html',
  styleUrls: ['./message-error-input.component.css']
})
export class MessageErrorInputComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
