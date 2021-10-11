type Data = Record<string, unknown>;
export default class JSWS {

  private sortOrder: Map<string, number>;

  constructor(sortOrder?: string[]) {
    this.sortOrder = new Map();
    (sortOrder || []).forEach((value, index) => {
      this.sortOrder.set(value, index);
    });
  }


sortMethod(a: unknown, b: unknown): number {
    if (typeof a === 'string' && typeof b === 'string') {
      if (!this.sortOrder.has(a)) {
        return this.sortOrder.size + 1 - (this.sortOrder.get(b) as number);
      }
      if (!this.sortOrder.has(b)) {
        return (this.sortOrder.get(a) as number) - this.sortOrder.size + 1;
      }
      if (this.sortOrder.has(a) && this.sortOrder.has(b)) {
        return (this.sortOrder.get(a) as number) - (this.sortOrder.get(b) as number);
      }
    }
    return -1;
  }

  stringify(data: Data): string {
    const localData: Data = { ...data };
    return JSON.stringify(
      {
        ...localData,
        toJson() {
          for (const key in this) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
              if (typeof localData[key] === 'object') {
                localData[key] = this.stringify(data[key] as Data);
              }
              return `"${key}": ${localData[key]}`;
            }
          }
        },
      },
      this.getAllKeys(localData).sort(this.sortMethod.bind(this)),
      2,
    );
  }

  getAllKeys(data: Data): string[] {
    let result: string[] = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result.push(key);
        if (typeof data[key] === 'object' && Object.keys(data[key] as Data).length) {
          const innerKeys = this.getAllKeys(data[key] as Data);
          result = [...result, ...innerKeys];
        }
      }
    }
    return Array.from(new Set(result));
  }
}