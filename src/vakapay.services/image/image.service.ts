import { Injectable } from '@angular/core';

import { HttpService } from 'network/http/http.service';
import { ResultObject } from 'model/result/ResultObject';

@Injectable({ providedIn: 'root' })

export class ImageService {
    private imageUrl = '/api/user/upload-avatar';  // URL to web api

    constructor(
        private httpService: HttpService,
    ) { }

    /** POST: image for user to the server */
    upload(file: any): Promise<ResultObject> {

        const uploadData = new FormData();
        uploadData.append('avatar', file, file.name);

        let operation = 'image';
        let api = this.imageUrl;
        let data = uploadData;
        return this.httpService.postFormData(operation, api, data);
    }

    uploadImgur(file: any): Promise<ResultObject> {

        const uploadData = new FormData();
        uploadData.append('image', file, file.name);

        let operation = 'image';
        let api = '';
        let data = uploadData;
        return this.httpService.postImgur(operation, api, data);
    }

}
