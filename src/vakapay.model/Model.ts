export class Model {
    set attributes(data) {
        var model = this;
        var listKeyModel = Object.keys(model);
        var listKeyData = Object.keys(data);
        var listKeyLower = listKeyData.map(x => x.toLowerCase());
        listKeyModel.forEach((key) => {
            let index = listKeyLower.indexOf(key.toLowerCase());
            if (index > -1) {
                model[key] = data[listKeyData[index]];
            }
        });
    }
}
