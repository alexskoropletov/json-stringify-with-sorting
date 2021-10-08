type Data = Record<string, unknown>;

export function sortMethod(sortOrder: string[]): (a: string, b: string) => number {
  return function(a: unknown, b: unknown): number {
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
}

export function stringify(data: Data): string {
  return JSON.stringify(
    {
      ...data,
      toJson() {
        for (const key in this) {
          if (Object.prototype.hasOwnProperty.call(this, key)) {
            if (typeof data[key] === 'object') {
              data[key] = stringify(data[key] as Data);
            }
            return `"${key}": ${data[key]}`;
          }
        }
      },
    },
    getAllKeys(data).sort(sortMethod([])),
    2,
  );
}

export function getAllKeys(data: Data): string[] {
  let result: string[] = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      result.push(key);
      if (typeof data[key] === 'object' && Object.keys(data[key] as Data).length) {
        const innerKeys = getAllKeys(data[key] as Data);
        result = [...result, ...innerKeys];
      }
    }
  }
  return Array.from(new Set(result));
}