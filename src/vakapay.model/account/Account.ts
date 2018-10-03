import { Model } from "model/Model";

export class Account extends Model {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    country: string;
    avatar: string;

    constructor(email = '', phone = '', firstName = '', lastName = '', birthday = '', country = '', avatar = '') {
        super();
        this.email = email;
        this.phoneNumber = phone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.country = country;
        this.avatar = avatar || 'assets/images/profile/img1.jpg';
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}