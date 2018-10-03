export class Account {
    email: string;
    phone: string;
    fullName: string;

    constructor(email, phone, fullName) {
        this.email = email;
        this.phone = phone;
        this.fullName = fullName;
    }
}