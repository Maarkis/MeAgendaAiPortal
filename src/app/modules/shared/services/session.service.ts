import {Injectable} from '@angular/core';
import {UserAuthenticated} from '../models/authentication/authentication';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private authenticatedInSystem = false;

    constructor() {
    }

    public setUser(user: UserAuthenticated): void {
        sessionStorage.setItem('user-authenticated', JSON.stringify(user));
    }
    get userAuthenticated(): UserAuthenticated {
        return JSON.parse(sessionStorage.getItem('user-authenticated'));
    }

    public setToken(token: string ): void {
        sessionStorage.setItem('token', token);
    }
    get token(): string { return sessionStorage.getItem('token'); }

    public authenticated(logged: boolean): void {
        this.authenticatedInSystem = true;
        sessionStorage.setItem('authenticated', String(logged));
    }
    get isAuthenticated(): boolean { return this.authenticatedInSystem; }

    public logoff() {
        sessionStorage.removeItem('user-authenticated');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authenticated');
        this.authenticatedInSystem = false;
    }

}
