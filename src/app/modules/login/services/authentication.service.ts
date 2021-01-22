import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../shared/models/response-base';
import {Authentication, UserAuthenticated} from '../../shared/models/authentication/authentication';
import {RequestResetPassword} from '../../shared/models/authentication/request-reset-password';
import {strict} from 'assert';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    URL: string = environment.API + '/Authentication';

    constructor(private http: HttpClient) {

    }

    /**
     * Faz o login no sistema  Me agenda aí
     * @param authentication
     */
    public login(authentication: Authentication): Observable<ResponseBase<UserAuthenticated>> {
        return this.http.post<ResponseBase<UserAuthenticated>>(`${this.URL}`, authentication);
    }
    public recoverPassword(email: string): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(`${this.URL}/RecoverPassword`, email);
    }
    /**
     * Faz o login no sistema  Me agenda aí
     * @param resetPassword
     * @type RequestResetPassword
     */
    public resetPassword(resetPassword: RequestResetPassword): Observable<ResponseBase<string>> {
        return this.http.put<ResponseBase<string>>(`${this.URL}/ResetPassword`, resetPassword);
    }

}
