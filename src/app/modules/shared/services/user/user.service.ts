import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../models/response-base';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly URL: string = environment.API + '/User';
    constructor(private http: HttpClient) {
    }

    public clientVerified(id: string): Observable<ResponseBase<{ userVerified: boolean }>> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<ResponseBase<{ userVerified: boolean }>>(`${this.URL}/ClientVerified`, {params});
    }

    public resendEmail(email: string): Observable<ResponseBase<string>> {
        // let params = new HttpParams();
        // params = params.append('email', email);
        return this.http.post<ResponseBase<string>>(`${this.URL}/SendEmailConfirmation`, {email});
    }

    public confirmationEmail(id: string): Observable<ResponseBase<string>> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.put<ResponseBase<string>>(`${this.URL}/ConfirmationEmail`, '', {params});
    }
}
