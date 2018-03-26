function prepareData(category, data, label) {
    category.training = [];
    category.testing  = [];
    for (let i = 0; i < totalData; i++) {
        let offset = i * len;
        if (i < toTrain) {
            category.training[i] = data.values.subarray(offset, offset+len);
            category.training[i].label = label;
        } else {
            category.testing[i-toTrain] = data.values.subarray(offset, offset+len);
            category.testing[i-toTrain].label = label;
        }
    }
}