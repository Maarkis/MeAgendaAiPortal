import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor() {
    }

    saveUserIdLocalStorage(userId: string) { localStorage.setItem('userId', userId); }
    saveNameLocalStorage(name: string) { localStorage.setItem('name', name); }
    saveEmailLocalStorage(email: string) { localStorage.setItem('email', email); }
    isLogged(logged: boolean) { localStorage.setItem('logged', String(logged)); }
}
