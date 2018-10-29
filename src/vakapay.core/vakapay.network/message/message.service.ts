import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string) {
    console.log(`%c ${message}`, 'background: #222; color: #bada55');
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
