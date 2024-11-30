import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'nglib';
import { AsyncCommand } from 'nglib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  authFailed: boolean;
  returnUrl: string;
  user: User = new User();
  spinnerMode = 'determinate';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService) { }

  ngOnInit() {
    let returnUrl = this._route.snapshot.queryParams['returnUrl'];
    this.returnUrl = returnUrl !== 'login' ? returnUrl || '/' : '/';
  }

  login() {
    console.log('user');
    console.log(this.user);
    this.showSpinner();
    this._authService.auth(this.user)
      .subscribe(
      user => {
        this.authFailed = false;
        this._router.navigate([this.returnUrl]);
      },
      error => {
        this.hideSpinner();
        this.authFailed = true;
      }
      );

    this._authService.auth(this.user);
  }

  showSpinner() {
    this.spinnerMode = 'indeterminate';
  }

  hideSpinner() {
    this.spinnerMode = 'determinate';
  }
}
