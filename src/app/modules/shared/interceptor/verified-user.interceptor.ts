import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {SessionService} from '../services/session.service';
import {AuthenticationService} from '../../login/services/authentication.service';
import {UserAuthenticated} from '../models/authentication/authentication';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../services/user/user.service';
import {ModalEmailConfirmationComponent} from '../components/modal-email-confirmation/modal-email-confirmation.component';
import {ResponseBase} from '../models/response-base';

@Injectable()
export class VerifiedUserInterceptor implements HttpInterceptor {
    private userAuthentication: UserAuthenticated = null;
    private checked = false;

    constructor(private dialog: MatDialog, private userService: UserService, private sessionService: SessionService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.checked) {
            this.userAuthentication = this.sessionService.userAuthenticated;
            if (this.userAuthentication && this.userAuthentication.expiration) {
                this.checked = true;
                const date = new Date(this.userAuthentication.expiration);
                const today = new Date();
                if (date >= today) {
                    this.userService.clientVerified(this.userAuthentication.id)
                        .subscribe((response: ResponseBase<{ userVerified: boolean }>) => {
                            if (response.success) {
                                if (!response.result.userVerified) {
                                    this.dialog.open(ModalEmailConfirmationComponent, {
                                        id: 'email-confirmation-modal', panelClass: 'custom-modal',
                                        width: '500px', height: 'auto', disableClose: true, data: {
                                            id: this.userAuthentication.id,
                                            email: this.userAuthentication.userEmail,
                                            nextRoute: ''
                                        }
                                    });
                                }
                            }
                        });
                }
            }
            this.userService = null;
        }
        return next.handle(req);
    }

}
