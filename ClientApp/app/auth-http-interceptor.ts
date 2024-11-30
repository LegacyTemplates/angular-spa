import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Logger, LocalStorage } from 'nglib';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    constructor(private _injector: Injector, private _localStorage: LocalStorage,
        private _authHttp: AuthHttp) {

    }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //let authService = this._injector.get(AuthService);
        //let token = authService.getToken();

        let token = this._localStorage.get('token');
        Logger.log('AuthHttpInterceptor. Token', token, this._authHttp);
        req.headers.append('Authorization', `Bearer ${token}`);
        return next.handle(req);
    }
}