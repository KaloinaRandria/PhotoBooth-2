import CryptoJS from 'crypto-js';

export class DataSecurity {
  static encryptData(data: any, key: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  static decryptData(encryptedData: string, key: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
