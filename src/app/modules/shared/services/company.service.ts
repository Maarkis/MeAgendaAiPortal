import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../models/response-base';
import {Company} from '../models/Company';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    URL: string = environment.API + '/Company';

    constructor(private http: HttpClient) {
    }
    private getParams = (id: string): HttpParams => {
        let params = new HttpParams();
        params = params.append('companyId', id.toString());
        return params;
    };

    public getCompanyComplete(companyId: string): Observable<ResponseBase<Company>> {
        const httpOptions = {
            params: this.getParams(companyId)
        };
        return this.http.get<ResponseBase<Company>>(`${this.URL}/GetCompanyComplete`,  httpOptions);
    }
}
