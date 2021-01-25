import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../models/response-base';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private readonly URL: string = environment.API + '/Client';
    constructor(private http: HttpClient) {
    }


}
