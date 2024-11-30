import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { LocalStorage } from 'nglib';
import { Logger } from 'nglib';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable() export class AuthService {

    constructor( @Inject(HttpClient) private _http: HttpClient,
        //private _localStorage: LocalStorage,
        private _userService: UserService,
        private _jwtHelper: JwtHelper) { }

    auth(user: any) {
        return this.handleAuthResponse(this._http.post<any>('auth', user));
    }

    refreshToken() {
        let user = this._userService.getCurrentUser();
        return this.handleAuthResponse(this._http.post<any>('auth/refresh', user));
    }

    getToken() {
        return localStorage.getItem('token');
    }
    
    private handleAuthResponse(responseObserv: Observable<any>) {
        return new Observable<any>(observe => {
            responseObserv.subscribe(
                r => {
                    if (r !== null) {
                        console.log("auth succeded");
                        console.log(r);
                        this.saveToken(r.token, r.refreshToken);
                        this._userService.setCurrentUser(r);
                        observe.next(r);
                    } else {
                        console.log("auth failed. user is null");
                        console.log(r);
                        observe.error(r);
                    }
                },
                error => {
                    console.log("auth failed");
                    console.log(error);
                    observe.error(error);
                },
                () => {
                    observe.complete();
                }
            );
        })
    }

    private saveToken(token: string, refreshToken: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refreshToken);
    }

    private decodeToken(): void {
        if (tokenNotExpired()) {
            console.log('decode token');
            console.log(this._jwtHelper.decodeToken(this.getToken()));
        }
    }
}