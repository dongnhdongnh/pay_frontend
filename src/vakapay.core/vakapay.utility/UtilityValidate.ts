const PASSWORD_RESET_TOKEN_EXPIRE = 900;

class Validate {
    static isNumber(num) {
        return typeof num === 'number';
    }

    static isPositive(number) {
        return this.isNumber(number) && number > 0;
    }

    static isBoolean(val) {
        return typeof val === 'boolean';
    }

    //Function validate common
    static isAlphaNumericCharacter(str) {
        return /^[a-z0-9]+$/i.test(str);
    }

    static isAlphaCharacter(str) {
        return /^[a-z]+$/i.test(str);
    }

    static isNumericCharacter(str) {
        return /^[0-9]+$/i.test(str);
    }

    static isString(str, lengthMin, lengthMax) {
        return typeof str === 'string' && str.length <= lengthMax && str.length >= lengthMin;
    }

    static isValidAprroveLink(link) {
        if (!link)
            return false;

        var dataLink = link.split('__');

        if (dataLink.length < 3)
            return false;

        var time = parseInt(dataLink[2]);
        var expire = PASSWORD_RESET_TOKEN_EXPIRE;
        return time + expire >= new Date().getTime() / 1000;
    }

    //Return guid
    static isValidFilter(filter) {
        return /^[a-z0-9@.]+$/i.test(filter);
    }

    static validateString(str, lengthMin, lengthMax, name = 'String') {
        if (typeof str !== 'string') throw new Error(`${name} is not string.`);
        if (lengthMin === lengthMax && str.length !== lengthMin)
            throw new Error(`${name} is required with length ${lengthMin}`);
        if (lengthMax && str.length > lengthMax) throw new Error(`${name} is required with max-length ${lengthMax}`);
        if (lengthMin && str.length < lengthMin) throw new Error(`${name} is required with min-length ${lengthMin}`);
    }

    static isPostalCode(str) {
        return /^[a-z0-9-]+$/i.test(str);
    }
}

export class UtilityValidate extends Validate {

    static validateStreet(str) {
        this.validateString(str, 0, 300, 'Street Address');
    }

    static validateCity(str) {
        this.validateString(str, 0, 300, 'City');
    }

    static validatePostalCode(str) {
        this.validateString(str, 0, 50, 'Postal code');
        if (this.isPostalCode(str) === false)
            throw new Error(`Postal code ${str} is invalid`);
    }

    static validateFilter(filter) {
        if (this.isValidFilter(filter) === false)
            throw new Error('Filter is invalid.');
    }

    static validateNumberPositive(number) {
        if (this.isNumber(number) === false) {
            throw new Error(`${String(number)} is not number.`);
        }
        if (number <= 0) {
            throw new Error(`${number} is required with positive number.`);
        }
    }

    static validateNumberNonNegative(number) {
        if (this.isNumber(number) === false) {
            throw new Error(`${String(number)} is not number.`);
        }
        if (number < 0) {
            throw new Error(`${number} is required with nonnegative number.`);
        }
    }

    static require(obj, keys = []) {
        keys.forEach(element => { if (!obj[element]) throw new Error(`${element} is required!`) });
    }

    static comparePassword(password1, password2) {
        if (password1 !== password2)
            throw new Error('Two passwords are not match.');
    }

    static validateImage(file, MAX_FILE_SIZE = 2) {
        if (file == null) throw new Error('File is not choose.');
        this.validateImageType(file['type'] || file['mimetype']);
        this.validateImageSize(file['size'], MAX_FILE_SIZE);
    }

    static validateImageType(mimetype) {
        if (!mimetype) throw new Error('Error get type of image');
        const regex = /(image\/png|image\/jpg|image\/svg|image\/svg+xml|image\/jpeg)/;
        const isValid = Boolean(mimetype.match(regex));
        if (!isValid) {
            throw new Error(`Image type is invalid. Please choose with type png, jpg, svg, svg+xml, jpeg.`);
        }
    }

    static validateImageSize(size, MAX_FILE_SIZE) {
        if (size == null) throw new Error('Error get size of image.');
        const FILESIZE = size / 1024 / 1024; // in MB
        if (FILESIZE > MAX_FILE_SIZE) throw new Error(`File size exceeds ${MAX_FILE_SIZE} MB`);
    }

    static validateImageName(imageName) {
        this.validateString(imageName, 0, 300, 'Image name');
        this.validateImageType(imageName.split('.').pop());
    }

    static validateCode(code) {
        this.validateString(code, 0, 100, 'Code');

        if (this.isAlphaNumericCharacter(code) === false) {
            throw new Error('Code is only alpha chatacters and numeric.');
        }
    }

    static validateCodePhone(code, maxLength = 6) {
        if (!code) throw new Error('Code is required');
        this.validateString(code, maxLength, maxLength, 'Code');

        if (this.isNumericCharacter(code) === false) {
            throw new Error('Code is only numeric chatacters.');
        }
    }

    static validateToken(token, maxLength = 6) {
        if (!token) throw new Error('Token is required');
        this.validateString(token, maxLength, maxLength, 'Code');

        if (this.isNumericCharacter(token) === false) {
            throw new Error('Token is only numeric chatacters.');
        }
    }

    static validatePassword(password) {
        this.validateString(password, 6, 50, 'Password')
    }

    static validateFullName(fullName) {
        this.validateString(fullName, 0, 100, 'Name')
    }

    static validateFirstName(firstName) {
        this.validateString(firstName, 0, 100, 'First name')
    }

    static validateLastName(lastName) {
        this.validateString(lastName, 0, 100, 'Last name')
    }

    static validateConfigName(configName) {
        this.validateString(configName, 0, 300, 'Name config')
    }

    static validateUsername(username) {
        try {
            if (this.isAlphaNumericCharacter(username) === true) return;
            this.validateEmail(username);
        } catch (error) {
            throw new Error('Username is invalid');
        }
    }

    //Return guid
    static validateEmail(email) {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            throw new Error('Email in invalid');
    }

    static validatePhoneNumber(phoneNumber) {
        var isHasOnlyNumber = this.isNumericCharacter(phoneNumber);
        var isValidLength = this.validateString(phoneNumber, 6, 15);
        if (!isHasOnlyNumber || !isValidLength)
            throw new Error('Phone number is invalid');
    }

    static validateSubscribeEmail(subscribeEmail) {
        if (subscribeEmail !== 0 && subscribeEmail !== 1)
            throw new Error('Subscribe email is invalid');
    }

    static validateAdressJdcoin(address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
            // check if it has the basic requirements of an address
            throw new Error('Address JDCoin is invalid');

        if (
            /^(0x)?[0-9a-f]{40}$/.test(address) ||
            /^(0x)?[0-9A-F]{40}$/.test(address))
            // If it's all small caps or all all caps, return true
            return true;
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
        return this.validateString(message, 0, 1000, 'Message')
    }

    static validateSubject(subject) {
        return this.validateString(subject, 0, 1000, 'Subject');
    }

    static validateAccountEos(accountName) {
        if (`${accountName || ''}`.length > 12)
            throw new Error(`Account name Eos has max length is 12`);

        if (/^[a-z1-5.]+$/.test(accountName) === false)
            throw new Error('Account name Eos has only a-z and 1-5');
    }

    static validateSeoUrl(seoUrl) {
        if (!seoUrl) throw new Error('Seo url is NULL');
        if (!/^[a-zA-Z0-9_-]+$/i.test(seoUrl)) throw new Error(`Seo url is invalid.`);
    }

    static validateId(id) {
        if (/^[a-z0-9-]+$/i.test(id) === false) throw new Error('Id is invalid');
    }

    static validatePasswordReset(password) {
        if (/^[a-z0-9_:.]+$/i.test(password) === false)
            throw new Error('Password reset is invalid.');
        if (this.isValidAprroveLink(password))
            throw new Error('Link counter has expired.');
    }
}