export class Model {
    set attributes(data) {
        var model = this;
        var listKeyModel = Object.keys(model);
        var listKeyData = Object.keys(data);
        var listKeyLower = listKeyData.map(x => x.toLowerCase());
        listKeyModel.forEach((key) => {
            let index = listKeyLower.indexOf(key.toLowerCase());
            if (index > -1 && data[listKeyData[index]]) {
                model[key] = data[listKeyData[index]];
            }
        });
    }

    set attributesLower(data) {
        var model = this;
        var listKeyModel = Object.keys(model);
        var listKeyData = Object.keys(data);
        var listKeyLower = listKeyData.map(x => x.toLowerCase());
        listKeyData.forEach((key) => {
            model[key.toLowerCase()]=data[key]
            // let index = listKeyLower.indexOf(key.toLowerCase());
            // if (index > -1 && data[listKeyData[index]]) {
            //     model[key] = data[listKeyData[index]];
            // }
        });
    }
}
