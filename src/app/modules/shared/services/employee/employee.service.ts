import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseBase} from '../../models/response-base.class';
import {EmployeeRegister} from '../../../employee/model/employee-register.class';
import {ListEmployee} from '../../../employee/model/list-employee.class';
import {AddServicesToEmployee} from '../../../employee/model/add-services-to-employee.class';
import {Service} from '../../models/service.class';
import {Employee} from '../../models/company.class';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private readonly URL: string = environment.API + '/Employee';

    constructor(private http: HttpClient) {
    }

    public getEmployeesByCompanyId(companyId: string): Observable<ResponseBase<ListEmployee[]>> {
        return this.http.get<ResponseBase<ListEmployee[]>>(`${this.URL}/GetEmployeesByCompanyId/${companyId}`);
    }

    public addEmployee(employee: EmployeeRegister): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(`${this.URL}/AddEmployee`, employee);
    }

    public addServicesToEmployee(addServicesToEmployee: AddServicesToEmployee): Observable<ResponseBase<string>> {
        return this.http.post<ResponseBase<string>>(`${this.URL}/AddServicesToEmployee`, addServicesToEmployee);
    }

    public getEmployeeServices(employeeId: string): Observable<ResponseBase<Service[]>> {
        return this.http.get<ResponseBase<Service[]>>(`${this.URL}/GetEmployeeServices/${employeeId}`);
    }

    public getEmployeeComplete(employeeId: string): Observable<ResponseBase<Employee>> {
        return this.http.get<ResponseBase<Employee>>(`${this.URL}/GetEmployeeInfoComplete/${employeeId}`);
    }

}
