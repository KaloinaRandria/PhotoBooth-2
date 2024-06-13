import {DataSecurity} from "../../util/data-security";
import {Router} from "@angular/router";
import {Constants} from "../../util/constants";

export class User {
  name: string;
  password: string;

  constructor(username: string, password: string) {
    this.name = username;
    this.password = password;
  }

  static init() {
    return new User('', '');
  }

  static getUserAuth(): any {
    const dataSecurity = new DataSecurity();
    const encryptedUserData = localStorage.getItem(Constants.USR_KEY);
    if (encryptedUserData) {
      return DataSecurity.decryptData(encryptedUserData, 'auth');
    } else {
      throw new Error("Undefined auth");
    }
  }

  static verify(): boolean {
    try {
      this.getUserAuth();
      return true;
    } catch (e) {
      return false;
    }
  }

  static setUserAuth(encryptedData: string): void {
    localStorage.setItem(Constants.USR_KEY, encryptedData);
  }

  static isUserAuthSetted(): boolean {
    return localStorage.getItem(Constants.USR_KEY) !== null;
  }

  static logOut(router: Router) {
    localStorage.removeItem(Constants.USR_KEY);
    router.navigate(['/login']).then(r => true);
  }
}
