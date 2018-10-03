import { Model } from "model/Model";

export class Account extends Model {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    country: string;

    constructor(email = '', phone = '', firstName = '', lastName = '', birthday = '', country = '') {
        super();
        this.email = email;
        this.phoneNumber = phone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.country = country;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}