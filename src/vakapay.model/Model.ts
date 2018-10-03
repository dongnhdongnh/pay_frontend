export class Model {
    set attributes(data) {
        var model = this;
        var listKeyModel = Object.keys(model);
        var listKeyData = Object.keys(data);
        var listKeyLower = listKeyData.map(x => x.toLowerCase());
        listKeyModel.forEach((key, index) => {
            if (listKeyLower.includes(key.toLowerCase())) {
                model[key] = data[listKeyData[index]];
            }
        });
        Object.keys(data).map(key => {
            if (data.hasOwnProperty(key.toLowerCase())) {
                model[key] = data[key.toLowerCase()];
            }
        });
    }
}