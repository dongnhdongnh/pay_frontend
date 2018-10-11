import { Model } from "model/Model";
import { UtilityFormat } from "utility/utilityFormat";

export class WebSession extends Model {
    id: string;
    updatedAt: number;
    browser: string;
    userIp: string;
    address: string;
    current: number;

    constructor() {
        super();
        this.id = '';
        this.updatedAt = 0;
        this.browser = '';
        this.userIp = '';
        this.address = '';
        this.current = 1;
    }

    get signedIn() {
        return UtilityFormat.formatDateBefore(this.updatedAt);
    }
}

export class ListWebSession extends Model {
    list: any[]

    constructor() {
        super();
        this.list = [];
    }

    format() {
        this.list = this.list.map(item => {
            let webSession = new WebSession();
            webSession.attributes = item;
            return webSession;
        })
    }
}