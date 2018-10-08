export class Model {
    set attributes(data) {
        var model = this;
        var listKeyModel = Object.keys(model);
        var listKeyData = Object.keys(data);
        var listKeyLower = listKeyData.map(x => x.toLowerCase());
        listKeyModel.forEach((key) => {
            let index = listKeyLower.indexOf(key.toLowerCase());
            if (index > -1 && data[listKeyData[index]]) {
                let value = data[listKeyData[index]];
                if (key === 'notifications') {
                    model[key] = String(value).split(',').map(x => x.trim());
                    return;
                }

                model[key] = value;
            }
        });
    }
}
