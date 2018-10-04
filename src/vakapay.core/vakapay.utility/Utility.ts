import { element } from 'protractor';

export class Utility {
    static getValueEventInput(event: any) { return event.target.value; }

    static focus(element) { element.nativeElement.focus(); }

    static isSuccess = data => !(data['error'] || (data['status'] && data['status'] === 'error'))

    static isError = data => data['error'] || (data['status'] && data['status'] === 'error')

    static isEnter(event: any) { return event.keyCode === 13; }

    // http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}