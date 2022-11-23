import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../redux/auth-state';
import { authStore } from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const customer = authStore.getState().customer;
        if (!customer) {
            alert("You are not logged-in");
            this.router.navigateByUrl("/login");
            return false;
        }

        return true;
    }

}
