import { Model } from "model/Model";
import { UtilityFormat } from "utility/utilityFormat";

export class ThirdPartyApp extends Model {
    id: string;
    application: string;
    permissions: string;
    when: number;

    constructor() {
        super();
        this.id = '';
        this.application = '';
        this.permissions = '';
        this.when = 0;
    }

    get whenFormat() {
        return UtilityFormat.formatDateBefore(this.when);
    }
}

export class ListThirdPartyApp extends Model {
    list: any[]

    constructor() {
        super();
        this.list = [];
    }

    format() {
        this.list.sort((a, b) => {
            return b.when - a.when;
        })
        this.list = this.list.map(item => {
            let thirdPartyApp = new ThirdPartyApp();
            thirdPartyApp.attributes = item;
            return thirdPartyApp;
        })
    }
}