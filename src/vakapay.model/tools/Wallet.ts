export class Wallet {
    key: string;
    name: string;
    disabled: boolean;

    constructor(key, name, disabled = false) {
        this.key = key;
        this.name = name;
        this.disabled = disabled;
    }
}