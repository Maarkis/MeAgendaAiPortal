import {Service} from './service.class';

export class Company {
    public companyId: string;
    public companyName: string;
    public link: string;
    public descricao: string;
    public cnpj: string;
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
