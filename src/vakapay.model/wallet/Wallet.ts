import { Model } from "model/Model";

export class Wallet extends Model {
    id: string;
    balance: string;
    userid: string;
    networkname:string;
    address:string;
    createdat:string;
    updatedat:string;
    version:string;
    data:string;
    

    constructor() {
        super();
     
    }

    get fullName() {
        return ``;
    }
}