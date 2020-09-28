import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private isAuthenticate = false;
    constructor() {
    }

    saveUserIdLocalStorage(userId: string) { localStorage.setItem('userId', userId); }
    saveNameLocalStorage(name: string) { localStorage.setItem('name', name); }
    saveEmailLocalStorage(email: string) { localStorage.setItem('email', email); }
    isLogged(logged: boolean) {
        this.isAuthenticate = true;
        localStorage.setItem('logged', String(logged));
    }


    public isAuthenticated(): boolean {
        return this.isAuthenticate;
    }

    public logoff() {
        localStorage.removeItem('logged');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        this.isAuthenticate = false;
    }

    public getUserId(): string {
        return localStorage.getItem('userId');
    }
}
