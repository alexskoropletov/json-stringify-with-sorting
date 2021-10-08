"use strict";
// sorting keys of specimen json in specific order
const sortOrder = [
    'isControl',
    'controlBarcode',
    'sampleType',
    'indexCategory',
    'indexName',
];
function sortMethod(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        if (sortOrder.indexOf(a) < 0) {
            return 1;
        }
        if (sortOrder.indexOf(b) < 0) {
            return 1;
        }
        return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    }
    return -1;
}
function stringify(data) {
    return JSON.stringify({
        ...data,
        toJson() {
            for (const key in this) {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    if (typeof data[key] === 'object') {
                        data[key] = stringify(data[key]);
                    }
                    return `"${key}": ${data[key]}`;
                }
            }
        },
    }, getAllKeys(data).sort(sortMethod), 2);
}
function getAllKeys(data) {
    let result = [];
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            result.push(key);
            if (typeof data[key] === 'object' && Object.keys(data[key]).length) {
                const innerKeys = getAllKeys(data[key]);
                result = [...result, ...innerKeys];
            }
        }
    }
    return Array.from(new Set(result));
}
//# sourceMappingURL=index.js.map