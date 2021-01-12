import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.sessionService.isAuthenticated) {
            return this.sessionService.isAuthenticated;
        }
        this.router.navigate(['/']);
        return false;
    }
}
