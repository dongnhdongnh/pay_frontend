import { Model } from "model/Model";

export class Security extends Model {
    isEnableTwofa: number;
    twofaOption: string;	

    constructor() {
        super();
        this.isEnableTwofa = 1;
        this.twofaOption = '1';
    }
}