import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, AuthConfigConsts, tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './services/auth.service';

export function AuthHttpFactory (http: Http, options: RequestOptions, authService: AuthService){
    return new AuthHttp(new AuthConfig({
        tokenName: AuthConfigConsts.DEFAULT_TOKEN_NAME,
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenGetter: () => {
            if(tokenNotExpired()){
                return  authService.getToken();
            } else {
                return new Promise<string>(
                    (resolve, reject) => {
                        authService.refreshToken()
                        .subscribe(
                            r => {
                                resolve(authService.getToken());
                            },
                            error => {
                                reject(error);
                            }
                        )
                    }
                );
            }
        }
    }), http, options);
}