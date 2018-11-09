import { Model } from "model/Model";
import { UtilityFormat } from "utility/utilityFormat";

export class Address extends Model {
    id: string;
    address: string;
    label: string;
    when: number;
    

    constructor() {
        super();
        this.id = '';
        this.label= '';
        this.when = 0;
        this.address = '';
        
    }

    set attributes(model) {
        this.id = model.Id;
        this.when = model.CreatedAt;
        this.label = model.Label;
        this.address = model.Address;
        
    }

    get whenFormat() {
        return UtilityFormat.formatDateBefore(this.when);
    }
}

export class ListAddress extends Model {
    list: any[]

    constructor() {
        super();
        this.list = [];
    }

    format() {
        this.list.sort((a, b) => {
            return b.CreatedAt - a.CreatedAt;
        })
        this.list = this.list.map(item => {
            let address = new Address();
            address.attributes = item;
            return address;
        })
    }
}