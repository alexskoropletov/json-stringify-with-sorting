"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JSWS {
    constructor(sortOrder) {
        this.sortOrder = new Map();
        (sortOrder || []).forEach((value, index) => {
            this.sortOrder.set(value, index);
        });
    }
    sortMethod(a, b) {
        if (typeof a === 'string' && typeof b === 'string') {
            if (!this.sortOrder.has(a)) {
                return this.sortOrder.size + 1 - this.sortOrder.get(b);
            }
            if (!this.sortOrder.has(b)) {
                return this.sortOrder.get(a) - this.sortOrder.size + 1;
            }
            if (this.sortOrder.has(a) && this.sortOrder.has(b)) {
                return this.sortOrder.get(a) - this.sortOrder.get(b);
            }
        }
        return -1;
    }
    stringify(data) {
        const localData = { ...data };
        return JSON.stringify({
            ...localData,
            toJson() {
                for (const key in this) {
                    if (Object.prototype.hasOwnProperty.call(this, key)) {
                        if (typeof localData[key] === 'object') {
                            localData[key] = this.stringify(data[key]);
                        }
                        return `"${key}": ${localData[key]}`;
                    }
                }
            },
        }, this.getAllKeys(localData).sort(this.sortMethod.bind(this)), 2);
    }
    getAllKeys(data) {
        let result = [];
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result.push(key);
                if (typeof data[key] === 'object' && Object.keys(data[key]).length) {
                    const innerKeys = this.getAllKeys(data[key]);
                    result = [...result, ...innerKeys];
                }
            }
        }
        return Array.from(new Set(result));
    }
}
exports.default = JSWS;
//# sourceMappingURL=index.js.map