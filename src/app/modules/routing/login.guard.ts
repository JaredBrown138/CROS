import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { StorageService } from "../../services/storage.service";

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        public storage: StorageService

    ) { }

    /** If the user isn't logged in, don't allow them 
     * to navigate to any component protected by this
     * method.
     */
    canActivate() {
        console.log(this.storage.isLoggedIn);
        if (this.storage.isLoggedIn != true || this.storage.isLoggedIn == undefined || this.storage.isLoggedIn == null) {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
}