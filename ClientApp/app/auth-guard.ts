import { Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from './services/user.service';
 
export class AuthGuard implements CanActivate {
 
    constructor(
        @Inject(Router) private _router: Router,
        @Inject(UserService) private _userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this._userService.hasCurrentUser()) {
            return true;
        }

        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
 