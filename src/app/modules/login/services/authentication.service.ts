import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../shared/models/response-base';
import {User} from '../../shared/models/User';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    URL: string = environment.API + '/User';

    constructor(private http: HttpClient) {    }

    public loginMock(): Observable<ResponseBase<User>> {
        return this.http.get<ResponseBase<User>>(`${this.URL}/LoginMock`);
    }

}
