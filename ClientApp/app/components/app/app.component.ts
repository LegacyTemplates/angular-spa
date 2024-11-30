import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import * as $ from 'jquery';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isPlatformServer: boolean;
    baseRoute = '/';
    loginRoute = '/login';
    hasCurrentUser = false;

    constructor(
        private _router: Router,
        private _userService: UserService,
        @Inject(PLATFORM_ID) protected platformId: Object) {
        this.isPlatformServer = isPlatformServer(this.platformId);

        _router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log(_router);
                this.hasCurrentUser = this._userService.hasCurrentUser();
                this.checkUser();
            }
        });
    }

    ngOnInit() {
    }

    sidenavCollapse() {
        $('#sidenav').toggleClass('collapse');
        $('#main').toggleClass('expand');
    }

    checkUser() {
        this.hasCurrentUser = this._userService.hasCurrentUser();
        if (!this.hasCurrentUser) {
            this._router.navigate([this.loginRoute]);
        }

        if (this.hasCurrentUser && this._router.url === this.loginRoute) {
            this._router.navigate([this.baseRoute]);
        }
    }

    logout() {
        console.log('logout');
        this._userService.removeCurrentUser();
        this._router.navigate([this.loginRoute]);
    }

    goto(route: string) {
        this._router.navigate([route]);
    }
}
