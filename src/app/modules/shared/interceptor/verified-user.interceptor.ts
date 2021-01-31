import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from '../services/session.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalEmailConfirmationComponent} from '../components/modal-email-confirmation/modal-email-confirmation.component';
import {UserAuthenticated} from '../models/authentication/authentication.class';
import {ResponseBase} from '../models/response-base.class';
import {UserService} from '../services/user/user.service';
import {tap} from 'rxjs/operators';


@Injectable()
export class VerifiedUserInterceptor implements HttpInterceptor {
    private userAuthenticated: UserAuthenticated;
    private checked = false;

    constructor(private userService: UserService, private dialog: MatDialog, private sessionService: SessionService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.userAuthenticated = this.sessionService.userAuthenticated;

        return next.handle(req).pipe(
            tap((ev: HttpResponse<any>) => {
                if (this.userAuthenticated) {
                    if (!this.checked) {
                        this.checked = true;
                        this.userService.clientVerified(this.userAuthenticated.id)
                            .subscribe((response: ResponseBase<{ userVerified: boolean }>) => {
                                if (response.success) {
                                    if (!response.result.userVerified) {
                                        this.dialog.open(ModalEmailConfirmationComponent, {
                                            id: 'email-confirmation-modal', panelClass: 'custom-modal',
                                            width: '500px', height: 'auto', disableClose: true, data: {
                                                id: this.userAuthenticated.id,
                                                email: this.userAuthenticated.userEmail,
                                                nextRoute: ''
                                            }
                                        });
                                    }
                                }
                            });
                    }
                } else {
                    this.checked = false;
                }
            }),
        );
    }
}
