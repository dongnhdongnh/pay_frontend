class utility {
    // http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static removeElement(array, index) {
        array.splice(index, index + 1);
        return array;
    }
}

export class Utility extends utility {
    static getValueEventInput(event: any) { return event.target.value.trim(); }

    static getInputValue(element) { return element.nativeElement.value.trim(); }

    static focus(element) { element.nativeElement.focus(); }

    static isSuccess = data => !(data['error'] || (data['status'] && String(data['status']).toLowerCase() === 'error'))

    static isError = data => data['error'] || (data['status'] && String(data['status']).toLowerCase() === 'error')

    static isEnter(event: any) { return event.keyCode === 13; }
}