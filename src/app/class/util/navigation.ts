import { Router } from "@angular/router";
import { User } from "../model/user/user";
import {Constants} from "./constants";

export class Navigation {
    static navigate(router: Router, direction: string) {
        const user = User.getUserAuth();
        const role = user.role;
        router.navigate(['/home/dashboard']).then(r => true);
    }
    static paginate(liste: any[], pageNo: number): any[] {
        const itemsPerPage = Constants.itemPerPage;
        const startIndex = (pageNo - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return liste.slice(startIndex, endIndex);
    }

    static maxPage(liste: any[]) {
        const itemsPerPage = Constants.itemPerPage;
        return Math.ceil(liste.length / itemsPerPage);
    }
  }