import { Injectable } from '@angular/core';
import { LocalStorage } from 'nglib';

@Injectable()
export class UserService {
    currentUserKey = 'currentUser';

    constructor(
        private _localStorage: LocalStorage) {

    }

    hasCurrentUser() {
        return this._localStorage.get(this.currentUserKey) !== null;
    }

    setCurrentUser(user: any) {
        this._localStorage.set(this.currentUserKey, user);
    }

    getCurrentUser() {
        return JSON.parse(this._localStorage.get(this.currentUserKey));
    }

    removeCurrentUser() {
        this._localStorage.remove(this.currentUserKey);
    }
}
