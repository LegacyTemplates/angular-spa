import { Component, Inject, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { MatDialog } from '@angular/material/dialog';
import { Messenger } from '../../../../services/messenger';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
})
export class PersonalComponent implements OnInit {

    constructor(
        private _authService: AuthService,
        private _authHttp: AuthHttp,
        private _messenger: Messenger,
        @Inject(MatDialog) private _dialog: MatDialog) {

    }

    ngOnInit() {
    }

    test() {
        this._authHttp.get('auth/secure')
            .subscribe(
            r => {
                // alert(`test succeded\n${r}`);
                this._messenger.showSuccess(`${r}`, 'test succeded');

            },
            error => {
                // alert(`test failed\n${error}`);
                this._messenger.showError(`${error}`, 'test succeded');
            },
            () => {
            }
            );
    }
}