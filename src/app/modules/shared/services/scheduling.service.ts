import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {NewScheduling} from '../models/new-scheduling';
import {Observable} from 'rxjs';
import {ResponseBase} from '../models/response-base';
import {Scheduling, SchedulingStatus} from '../models/scheduling';

@Injectable({
    providedIn: 'root'
})
export class SchedulingService {
    private readonly URL: string = environment.API + '/Scheduling';

    private getParams = (id: string): HttpParams => {
        let params = new HttpParams();
        params = params.append('userId', id.toString());
        return params;
    };

    constructor(private http: HttpClient) {
    }

    public createScheduling(scheduling: NewScheduling): Observable<ResponseBase<Scheduling>> {
        return this.http.post<ResponseBase<Scheduling>>(`${this.URL}/CreateScheduling`, scheduling);
    }

    public getClientSchedulingsByUserId(userId: string): Observable<ResponseBase<Scheduling[]>> {
        const httpOptions = {
            params: this.getParams(userId)
        };
        return this.http.get<ResponseBase<Scheduling[]>>(`${this.URL}/GetClientSchedulingsByUserId`, httpOptions);
    }

    public getHistoricClientSchedulingsByUserId(userId: string): Observable<ResponseBase<Scheduling[]>> {
        const httpOptions = {
            params: this.getParams(userId)
        };
        return this.http.get<ResponseBase<Scheduling[]>>(`${this.URL}/GetClientHistoricoSchedulingsByUserId`, httpOptions);
    }
    public updateSchedulingStatus(updateScheduling:
                                      {
                                          schedulingId: string;
                                          newStatus: SchedulingStatus
                                      }): Observable<ResponseBase<Scheduling[]>> {
        return this.http.post<ResponseBase<Scheduling[]>>(`${this.URL}/UpdateSchedulingStatus`, updateScheduling);
    }

    public getEmplooyeeSchedulingsByUserId(userId: string): Observable<ResponseBase<Scheduling[]>> {
        const httpOptions = {
            params: this.getParams(userId)
        };
        return this.http.get<ResponseBase<Scheduling[]>>(`${this.URL}/GetEmployeeSchedulingsByUserId`, httpOptions);
    }

    public getHistoricEmplooyeeSchedulingsByUserId(userId: string): Observable<ResponseBase<Scheduling[]>> {
        const httpOptions = {
            params: this.getParams(userId)
        };
        return this.http.get<ResponseBase<Scheduling[]>>(`${this.URL}/GetHistoricoEmployeeSchedulingsByUserId`, httpOptions);
    }
}
