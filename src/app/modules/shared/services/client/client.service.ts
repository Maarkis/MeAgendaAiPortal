import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../models/response-base';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserRegister} from '../../../login/model/user-register.class';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private readonly URL: string = environment.API + '/Client';

    constructor(private http: HttpClient) {
    }

    public addClient(user: UserRegister): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(`${this.URL}/AddClient`, user);
    }


}
