import { Router } from "@angular/router";
import { User } from "../model/user/user";

export class Navigation {
    static navigate(router: Router, direction: string) {
        const user = User.getUserAuth();
        const role = user.role;
        router.navigate(['/home/dashboard']).then(r => true);
    }
  }