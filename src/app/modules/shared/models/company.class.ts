import {Service} from './service.class';

export class Company {
    public companyId: string;
    public companyName: string;
    public CPF: string;
    public CNPJ: string;
    public limitCancelHours: number;
    public companyServices: Service[];
    public employees: Employee[];
}

export class Employee {
    public employeeId: string;
    public emplyeeName: string;
    public isManager: boolean;
    public employeeServices: Service[];
}
