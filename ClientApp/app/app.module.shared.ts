import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthModule, AuthHttp, AuthConfig, AuthConfigConsts, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Messenger, MessengerComponent } from './services/messenger';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AuthGuard } from './auth-guard';
import { LocalStorage, PaginatorPanel } from 'nglib';
import { AuthHttpInterceptor } from './auth-http-interceptor';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthHttpFactory } from './auth-http-factory';
import { AppMaterialModule } from './app-material.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavMenuComponent,
        HomeComponent,
        MessengerComponent,
        PaginatorPanel
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                children: [
                    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
                    { path: '', component: NavMenuComponent, outlet: 'nav', canActivate: [AuthGuard] }
                ]
            },
            { path: 'login', component: LoginComponent },
            { path: 'personal', loadChildren: './modules/personal/personal.module#PersonalModule', canActivate: [AuthGuard] }
        ]),
        AppMaterialModule
    ],
    providers: [
        AuthGuard,
        LocalStorage,
        Messenger,
        UserService,
        AuthService,
        JwtHelper,
        {
            provide: AuthHttp,
            useFactory: AuthHttpFactory,
            deps: [Http, RequestOptions, AuthService]
        }
    ],
    entryComponents: [MessengerComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModuleShared {
}
  