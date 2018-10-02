import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private development: string;
    url: string;

    constructor(
    ) {
        this.url = 'http://localhost:4040';
    }
}
