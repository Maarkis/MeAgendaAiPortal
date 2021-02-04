import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../models/response-base.class';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {User} from '../../models/user.class';
import {UserAccount} from '../../models/user-account.class';
import {EditName} from '../../../account/components/model/edit-name.class';

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
        return this.http.post<ResponseBase<string>>(`${this.URL}/SendEmailConfirmation`, {email});
    }

    public confirmationEmail(id: string): Observable<ResponseBase<string>> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.put<ResponseBase<string>>(`${this.URL}/ConfirmationEmail`, '', {params});
    }

    public getById(id: string): Observable<ResponseBase<User>> {
        return this.http.get<ResponseBase<User>>(`${this.URL}/GetById/${id}`);
    }

    public getAccount(id: string): Observable<ResponseBase<UserAccount>> {
        return this.http.get<ResponseBase<UserAccount>>(`${this.URL}/Account/${id}`);
    }

    public editaName(editName: EditName): Observable<ResponseBase<string>> {
        return this.http.put<ResponseBase<string>>(`${this.URL}/EditName`, editName);
    }
}
