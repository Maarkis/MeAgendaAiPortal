import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../shared/models/response-base';
import {Authentication, UserAuthenticated} from '../../shared/models/authentication/authentication';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    URL: string = environment.API + '/Authentication';

    constructor(private http: HttpClient) {    }

    public login(authentication: Authentication): Observable<ResponseBase<UserAuthenticated>> {
        return this.http.post<ResponseBase<UserAuthenticated>>(`${this.URL}`, authentication);
    }

}
