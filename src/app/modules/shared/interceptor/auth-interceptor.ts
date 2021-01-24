import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {throwError, Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, filter, take, switchMap, tap, finalize} from 'rxjs/operators';
import {SessionService} from '../services/session.service';
import {environment} from '../../../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly AUTH_HEADER = 'Authorization';
    private readonly STATUS_CODE = 401; // Unauthorized
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private sessionService: SessionService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(tap((ev: HttpEvent<any>) => {
                console.log('Ev:', ev);
            }),
            catchError((resp) => {
                if (resp instanceof HttpErrorResponse) {
                    if (resp && resp.status === this.STATUS_CODE) {
                        // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                        if (this.refreshTokenInProgress) {
                            return this.refreshTokenSubject.pipe(
                                filter(result => result !== null),
                                tap({
                                    next: x => {
                                        console.log(x);
                                    },
                                    error: err => {
                                        console.error(err);
                                    }
                                }),
                                switchMap(() => next.handle(this.addAuthenticationToken(req)))
                            );
                        }
                    } else {
                        this.refreshTokenInProgress = true;
                        return this.refreshAccessToken().pipe(
                            switchMap((success: any) => {
                                this.refreshTokenSubject.next(success);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                            // for the next time the token needs to be refreshed
                            finalize(() => this.refreshTokenInProgress = false)
                        );
                    }
                }
                return throwError(resp);
            })
        );
    }

    private refreshAccessToken(): Observable<any> {
        return of(this.sessionService.refreshToken);
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        if (!this.sessionService.token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        console.log(request.url);
        if (!request.url.match(environment.domain)) {
            return request;
        }
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.sessionService.token)
        });
    }
}
