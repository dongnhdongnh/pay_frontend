import { Model } from "model/Model";
import { UtilityFormat } from "utility/utilityFormat";

var LIST_ACTION = [];

class Action {
    name: string;
    value: string;

    constructor(name = '', value = '') {
        this.name = name;
        this.value = value;
    }

    static listAction() {
        if (LIST_ACTION.length > 0) return LIST_ACTION;
        let list = [];
        list.push(new Action('UpdateProfile', `Update profile`));
        LIST_ACTION = list;
        return LIST_ACTION;
    }

    static getAction(name) {
        let listAction = this.listAction();
        let mAction = listAction.find(action => action.name === name);
        if (!mAction) return 'You do something';
        return mAction.value;
    }
}

export class AccountActivity extends Model {
    id: string;
    when: number;
    action: string;
    source: string;
    ip: string;
    location: string;

    constructor() {
        super();
        this.id = '';
        this.when = 0;
        this.ip = '';
        this.source = '';
        this.action = '';
        this.location = '';
    }

    set attributes(model) {
        this.id = model.Id;
        this.when = model.CreatedAt;
        let actionName = model.ActionName;
        this.action = Action.getAction(actionName);
        this.ip = model.Ip;
    }

    get whenFormat() {
        return UtilityFormat.formatDateBefore(this.when);
    }
}

export class ListAccountActivity extends Model {
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
            let webSession = new AccountActivity();
            webSession.attributes = item;
            return webSession;
        })
    }
}