export class Login {
    email: string;
    password: string;
    recaptcha: string;

    constructor(email, password, recaptcha) {
        this.email = email;
        this.password = password;
        this.recaptcha = recaptcha;
    }
}