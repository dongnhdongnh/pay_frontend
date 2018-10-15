export class UtilityFormat {

    static toZeroFill(e, t) {
        if (e == null) return null;
        return e = String(e), e.length < t ? this.toZeroFill('0' + e, t) : e
    }

    static obj2txt(obj, tab = false) {
        return JSON.stringify(obj, null, tab ? 4 : 0);
    }

    static encodeObject(obj, keys) {
        keys.forEach(element => obj[element] && (obj[element] = this.encodeText(obj[element])));

        return obj;
    }

    static decodeObject(obj, keys) {
        keys.forEach(element => obj[element] && (obj[element] = this.decodeText(obj[element])));

        return obj;
    }

    static encodeText(txt) {
        return escape(this.getString(txt));
    }

    static decodeText(txt) {
        return unescape(txt);
    }

    static toZeroAppend(e, t) {
        if (e == null) return null;
        return e = String(e), e.length !== t ? this.toZeroAppend(e + '0', t) : e
    }

    static getString(str) {
        return String(str || '').trim();
    }

    //Get number with decimals
    static getNumber(number, decimals = null) {
        if (typeof number == 'string') {
            number = number.trim().replace(/,/g, '');
        }
        if (!number) return 0;
        if (decimals && typeof decimals == 'number') {
            number = parseFloat(`${parseFloat(number) || 0}`);
            let result = parseFloat(number.toFixed(decimals));
            if (result > number) {
                var sub = parseFloat(1 + '0'.repeat(decimals));
                sub = 1 / parseFloat(`${sub}`);
                result = result - sub;
            }
            return parseFloat(result.toFixed(decimals));
        } else {
            return parseFloat(number);
        }
    }

    static toFixed(x) {
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10, e - 1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } else {
            var e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                x += (new Array(e + 1)).join('0');
            }
        }
        return x;
    }

    static autoFormatNumber(number, decimals) {
        //Format data
        //Example: 1000000.0000 => 1000,000.0000
        if (number == null) return null;
        let point = String(number).includes('.');

        if (point) {
            //Get all element after first poin and join them
            let spli = String(number).split('.');
            if (spli.length > 1) {
                var [a, ..._after] = spli;
                if (_after) {
                    var after = _after.join('');
                }
            }
        }

        number = String(this.getNumber(`${number}`)).split('.');
        var x = number[0];
        {
            x = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        var y = number[1] || after;
        if (y != undefined && decimals) {
            y = y.slice(0, decimals);
            return x + '.' + y;
        }
        else if (y != undefined) {
            return [x, y].join('.');
        }
        else if (point) {
            return x + '.';
        }
        else {
            return x;
        }
    }

    static formatNumber(number, decimals, view = true) {
        //Format data
        //Example: 1000000.0000 => 1000,000.0000
        if (number == null) return null;
        number = String(this.toFixed(this.getNumber(number))).split('.');
        var x = number[0];
        {
            if (view) x = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        var y = number[1];
        if (y && decimals) {
            y = y.slice(0, decimals);
            return x + '.' + this.toZeroAppend(y, decimals);
        }
        else if (y) {
            return [x, y].join('.');
        } else {
            return x;
        }
    }

    static formatNumberSpecial(number, decimals, view = true) {
        //Format data
        //Example: 1000000.0000 => 1000,000.0000
        if (number == null) return null;
        number = String(this.toFixed(this.getNumber(number))).split('.');
        var x = number[0];
        {
            if (view) x = x.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        var y = number[1];
        if (y && decimals) {
            y = y.slice(0, decimals);
            return x + '.' + this.toZeroAppend(y, decimals);
        }
        else if (y) {
            return [x, y].join('.');
        } else {
            return `${x}.${'0'.repeat(decimals)}`;
        }
    }

    static formatDateBefore(time) {
        var agoSeconds = new Date().getTime() / 1000 - time;
        var agoMinutes = agoSeconds / 60;
        if (agoMinutes < 1) {
            var value = parseInt(String(agoSeconds));
            return `${value} second${value === 1 ? '' : 's'} ago`;
        }

        var agoHours = agoMinutes / 60;
        if (agoHours < 1) {
            var value = parseInt(String(agoMinutes));
            return `${value} minute${value === 1 ? '' : 's'} ago`;
        }

        var agoDay = agoMinutes / 24;
        if (agoDay < 1) {
            var value = parseInt(String(agoHours));
            return `${value} hour${value === 1 ? '' : 's'} ago`;
        }

        var agoYear = agoDay / 365;
        if (agoYear < 1) {
            var value = parseInt(String(agoDay));
            return `${value} day${value === 1 ? '' : 's'} ago`;
        }

        var value = parseInt(String(agoYear));
        return `${value} year${value === 1 ? '' : 's'} ago`;

    }

    static formatDate(time, format = "H:i:s - m/d/Y") {
        if (time == null)
            return null;

        //Example: format as string "H:i:s - d/m/Y"
        //time has unit that is miliseconds
        var date = new Date(time);

        var ss = this.toZeroFill(date.getSeconds(), 2);
        var ii = this.toZeroFill(date.getMinutes(), 2);
        var hh = this.toZeroFill(date.getHours(), 2);
        var dd = this.toZeroFill(date.getDate(), 2);
        var mm = this.toZeroFill(date.getMonth() + 1, 2);
        var yy = this.toZeroFill(date.getFullYear(), 4);

        return format.replace(/h+/i, hh).replace(/i+/i, ii).replace(/s+/i, ss).replace(/d+/i, dd).replace(/m+/i, mm).replace(/y+/i, yy);
    }

    static formatDateText(time) {
        if (time == null)
            return null;

        var date = new Date(time);

        var ss = date.getSeconds();
        var ii = date.getMinutes();
        var hh = date.getHours();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yy = date.getFullYear();

        var days = ['0', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
        var months = ['0', "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return `${months[mm]} ${days[dd]}, ${yy}`;
    }

    static getCurrentTime() {
        return this.formatDate(new Date().getTime(), 'H:i:s d/m/Y');
    }
}