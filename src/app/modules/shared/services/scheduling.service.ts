import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {NewScheduling} from '../models/new-scheduling';
import {Observable} from 'rxjs';
import {ResponseBase} from '../models/response-base';
import {Scheduling} from '../models/scheduling';

@Injectable({
    providedIn: 'root'
})
export class SchedulingService {
    URL: string = environment.API + '/Scheduling';

    constructor(private http: HttpClient) {
    }

    public createScheduling(scheduling: NewScheduling): Observable<ResponseBase<Scheduling>> {
        return this.http.post<ResponseBase<Scheduling>>(`${this.URL}/CreateScheduling`, scheduling);
    }
}
