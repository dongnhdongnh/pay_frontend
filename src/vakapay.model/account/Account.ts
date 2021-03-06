import { UtilityFormat } from 'utility/utilityFormat';
import { Model } from "model/Model";

export class Account extends Model {
    avatar: string;
    birthday: string;
    city: string;
    country: string;
    countryCode: string;
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    ipWhiteList: string;
    phoneNumber: string;
    postalCode: string;
    streetAddress1: string;
    streetAddress2: string;
    currencyKey: string;
    timezoneKey: string;
    notifications: string[];
    isLockScreen: number;
    isTwoFactor: number;

    constructor() {
        super();
        this.avatar = '' || 'assets/images/profile/img1.jpg';
        this.birthday = '';
        this.city = '';
        this.country = '';
        this.countryCode = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.id = '';
        this.ipWhiteList = '';
        this.phoneNumber = '';
        this.postalCode = '';
        this.streetAddress1 = '';
        this.streetAddress2 = '';
        this.currencyKey = null;
        this.timezoneKey = null;
        this.notifications = [];
        this.isLockScreen = 0;
        this.isTwoFactor = 0;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set attributes(data: any) {
        this._attributes = data;
        if (this.birthday) {
            let date = new Date(this.birthday);
            this.birthday = UtilityFormat.formatDateText(date.getTime());
        }
    }
}