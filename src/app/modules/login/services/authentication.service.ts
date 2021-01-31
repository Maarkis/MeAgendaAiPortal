import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../shared/models/response-base.class';
import {Authentication, UserAuthenticated} from '../../shared/models/authentication/authentication.class';
import {RequestResetPassword} from '../../shared/models/authentication/request-reset-password.class';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly URL: string = environment.API + '/Authentication';

    constructor(private http: HttpClient) {
    }

    /**
     * Faz a chamada para o login no sistema  Me agenda aí
     * @param authentication
     * @type Authentication
     * @return ResponseBase<UserAuthenticated>
     */
    public login(authentication: Authentication): Observable<ResponseBase<UserAuthenticated>> {
        return this.http.post<ResponseBase<UserAuthenticated>>(`${this.URL}`, authentication);
    }

    /**
     * Faz a chamada para envio de um e-mail para recuperação da conta
     * @param email
     * @type string
     * @return ResponseBase<string>
     */
    public recoverPassword(email: string): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(`${this.URL}/RecoverPassword`, email);
    }

    /**
     * Faz a chamada para api para o reset de senha do usuário
     * @param resetPassword
     * @type RequestResetPassword
     * @return ResponseBase<string>
     */
    public resetPassword(resetPassword: RequestResetPassword): Observable<ResponseBase<string>> {
        return this.http.put<ResponseBase<string>>(`${this.URL}/ResetPassword`, resetPassword);
    }


}
