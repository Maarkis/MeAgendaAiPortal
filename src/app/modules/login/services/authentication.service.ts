import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../shared/models/response-base';
import {User} from '../../shared/models/User';
import {Authentication} from '../model/authentication';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    URL: string = environment.API + '/Authentication';

    constructor(private http: HttpClient) {    }

    public login(authentication: Authentication): Observable<ResponseBase<User>> {
        return this.http.post<ResponseBase<User>>(`${this.URL}/Login`, authentication);
    }

}
