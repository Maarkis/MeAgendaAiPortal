import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {CEP} from '../../models/cep/CEP.class';

@Injectable({
    providedIn: 'root'
})
export class CepService {

    private readonly URL = environment.VIACep;
    private type: string = 'json';

    constructor(private http: HttpClient) {
    }

    public getCep(cep: string, type: string = this.type): Observable<CEP> {
        return this.http.get<CEP>(`${this.URL}/${cep}/${type}`);
    }

    public searchCEP(uf: string, cidade: string, lougradouro: string, type: string = this.type): Observable<CEP[]> {
        return this.http.get<CEP[]>(`${this.URL}/${uf}/${cidade}/${lougradouro}/${type}`);
    }

    get returnTypeResponse(): string {
        return this.type;
    }
}
