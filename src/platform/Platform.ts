export class PlatformUtils {
  static getGlobalVariable(): any {
    return global;
  }

  static getKeyByValue(object: Object, value: any): string {
    return Object.keys(object).find((key) => object[key] === value);
  }

  static randomIndice(length: number): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
