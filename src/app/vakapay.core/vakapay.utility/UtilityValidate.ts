export class UtilityValidate {

    static require(obj, keys) {
        keys.forEach(element => { if (!obj[element]) throw new Error(`${element} is required!`) });
    }

    static comparePassword(password1, password2) {
        if (password1 !== password2)
            throw new Error('Two passwords are not match.');
    }

    static validateCode(code) {
        if (this.validateString(code, 1, 100) === false) {
            throw new Error('Code is required with length 1 - 100 character!');
        }

        if (this.validateOnlyAlphaNumeric(code) === false) {
            throw new Error('Code is only alpha chatacters and numeric.');
        }
    }

    static validatePassword(password) {
        if (this.validateString(password, 8, 50) === false)
            throw new Error('Password is length 8 - 50');
    }

    static validateFullName(fullName) {
        if (this.validateString(fullName, 1, 100) === false)
            throw new Error('Name is required with length 1 - 100 character!');
    }


    static validateFirstName(firstName) {
        if (this.validateString(firstName, 1, 100) === false)
            throw new Error('First name is required with length 1 - 100 character!');
    }

    static validateLastName(lastName) {
        if (this.validateString(lastName, 1, 100) === false)
            throw new Error('Last name is required with length 1 - 100 character!');
    }

    static validateConfigName(configName) {
        if (this.validateString(configName, 1, 300) === false)
            throw new Error(`Name config is required with length from 1-300 characters.`);
    }

    static validateUsername(username) {
        try {
            if (this.validateOnlyAlphaNumeric(username) === true) return;
            this.validateEmail(username);
        } catch (error) {
            throw new Error('Username is invalid');
        }
    }

    //Return guid
    static validateEmail(email) {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false)
            throw new Error('Email in invalid');
    }

    static validatePhoneNumber(phoneNumber) {
        var isHasOnlyNumber = this.validateOnlyNumeric(phoneNumber);
        var isValidLength = this.validateString(phoneNumber, 6, 15);
        if (!isHasOnlyNumber || !isValidLength)
            throw new Error('Phone number is invalid');
    }

    static validateSubscribeEmail(subscribeEmail) {
        if (subscribeEmail !== 0 && subscribeEmail !== 1)
            throw new Error('Subscribe email is invalid');
    }

    static validateAdressJdcoin(address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            throw new Error('Address JDCoin is invalid');
        }

        if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        }

        return true;
    }

    static validateRole(str) {
        if (/^[0-9, ]+$/i.test(str) === false)
            throw new Error('Role is invalid');
    }

    static validateUrl(url) {
        if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url) === false)
            throw new Error('Url is invalid');
    }

    static validateMessage(message) {
        if (this.validateString(message, 0, 1000) === false)
            throw new Error('Message is required with length 0 - 1000 character!');
    }

    static validateSubject(subject) {
        if (this.validateString(subject, 0, 1000))
            throw new Error('Subject is required with length 0 - 1000 character!');
    }

    static validateAccountEos(accountName) {
        if (`${accountName || ''}`.length > 12)
            throw new Error(`Account name Eos has max length is 12`);

        if (/^[a-z1-5.]+$/.test(accountName) === false)
            throw new Error('Account name Eos has only a-z and 1-5');
    }

    static validateSeoUrl(seoUrl) {
        if (!seoUrl)
            throw new Error('Seo url is NULL');
        if (/^[a-zA-Z0-9_-]+$/i.test(seoUrl) === false)
            throw new Error(`Seo url is invalid.`);
    }

    static validateId(id) {
        if (/^[a-z0-9-]+$/i.test(id) === false)
            throw new Error('Id is invalid');
    }

    static validatePasswordReset(password) {
        if (/^[a-z0-9_:.]+$/i.test(password) === false)
            throw new Error('Password reset is invalid.');
    }

    //Function validate common
    static validateOnlyAlphaNumeric(str) {
        return /^[a-z0-9]+$/i.test(str);
    }

    static validateOnlyAlpha(str) {
        return /^[a-z]+$/i.test(str);
    }

    static validateOnlyNumeric(str) {
        return /^[0-9]+$/i.test(str);
    }

    static validateString(str, lengthMin, lengthMax) {
        return typeof str === 'string' && str.length <= lengthMax && str.length >= lengthMin;
    }

    static validateNumber(num) {
        return typeof num === 'number';
    }

    static validateBoolean(val) {
        return typeof val === 'boolean';
    }
}