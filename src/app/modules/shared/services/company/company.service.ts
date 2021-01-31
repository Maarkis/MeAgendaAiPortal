import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../models/response-base.class';
import {CompanyRegister} from '../../../login/model/company-register.class';
import {Company} from '../../models/company.class';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    private readonly URL: string = environment.API + '/Company';

    constructor(private http: HttpClient) {
    }
    private getParams = (id: string): HttpParams => {
        let params = new HttpParams();
        params = params.append('companyId', id.toString());
        return params;
    }

    public addCompany(company: CompanyRegister): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(`${this.URL}/AddCompany`, company);
    }

    public getCompanyComplete(companyId: string): Observable<ResponseBase<Company>> {
        const httpOptions = {
            params: this.getParams(companyId)
        };
        return this.http.get<ResponseBase<Company>>(`${this.URL}/GetCompanyComplete`,  httpOptions);
    }
}
