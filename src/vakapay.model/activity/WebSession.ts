import { Model } from "model/Model";
import { UtilityFormat } from "utility/utilityFormat";

export class WebSession extends Model {
    id: string;
    signedIn: number;
    browser: string;
    ip: string;
    location: string;
    current: number;

    constructor() {
        super();
        this.id = '';
        this.signedIn = 0;
        this.browser = '';
        this.ip = '';
        this.location = '';
        this.current = 1;
    }

    get signedInFormat() {
        return UtilityFormat.formatDateBefore(this.signedIn);
    }
}

export class ListWebSession extends Model {
    list: any[]

    constructor() {
        super();
        this.list = [];
    }

    format() {
        this.list.sort((a, b) => {
            return b.signedIn - a.signedIn;
        })
        this.list = this.list.map(item => {
            let webSession = new WebSession();
            webSession.attributes = item;
            return webSession;
        })
    }
}