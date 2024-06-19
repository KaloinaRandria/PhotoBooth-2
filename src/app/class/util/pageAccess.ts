import {User} from "../model/user/user";
import {Router} from "@angular/router";

export class PageAccess {
   static role: any[] = ['Level1', 'Level2'];
   static auth : any[] = [
      {route: 'home/dashboard', authorizedRole: [this.role[0], this.role[1]] },
      {route: 'home/reservation/insert', authorizedRole: [this.role[1]] }
       /* ampio eto fa tsy aiko avy io */
   ]

    static verifiate(route: string, roleA: string): boolean {
        const authEntry = this.auth.find(entry => entry.route === route);
        if (authEntry) {
            return authEntry.authorizedRole.includes(roleA);
        }

        alert('root not included in "auth" : (\'' + route + '\') \ninclude it in app/class/util/pageAccess.ts \nyour role is : ' + roleA);
        return false;
    }

    static autoVerifiatePermission(router: Router) {
        const route = router.url;
        try {
            const usr = User.getUserAuth();
            const role = usr.role.intitule;
            return this.verifiate(route, role);
        } catch (e) {
            return true;
        }
    }
}
