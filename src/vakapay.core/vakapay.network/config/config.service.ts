import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private development: string;
    url: string;
    urlVakaid: string;

    constructor(
    ) {
        if (this.development === 'node') {
            this.url = 'http://localhost:4040';
            return;
        }
    }
}
