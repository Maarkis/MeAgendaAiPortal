import {Injectable} from '@angular/core';
import {UserAuthenticated} from '../models/authentication/authentication';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private authenticatedInSystem = Boolean(sessionStorage.getItem('authenticated'));

    constructor() {
    }

    public setUser(user: UserAuthenticated): void {
        sessionStorage.setItem('user-authenticated', JSON.stringify(user));
    }
    get userAuthenticated(): UserAuthenticated {
        return JSON.parse(sessionStorage.getItem('user-authenticated'));
    }

    public setRefreshToken(refreshToken: string): void {
        sessionStorage.setItem('refreshToken', refreshToken);
    }
    get refreshToken(): string { return sessionStorage.getItem('refreshToken'); }

    public setToken(token: string ): void {
        sessionStorage.setItem('token', token);
    }
    get token(): string { return sessionStorage.getItem('token'); }


    public authenticated(logged: boolean): void {
        this.authenticatedInSystem = logged;
        sessionStorage.setItem('authenticated', String(logged));
    }
    get isAuthenticated(): boolean { return this.authenticatedInSystem; }

    public logoff(): void {
        sessionStorage.removeItem('user-authenticated');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authenticated');
        this.authenticatedInSystem = false;
    }

}
