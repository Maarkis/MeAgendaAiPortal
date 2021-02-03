import {Service} from './service.class';
import {Location} from './location.class';
import {PhoneNumbers} from './phone-numbers.class';

export class Company {
    public companyId: string;
    public companyName: string;
    public link: string;
    public descricao: string;
    public image: string;
    public email: string;
    public cnpj: string;
    public limitCancelHours: number;
    public companyServices: Service[];
    public employees: Employee[];
    public locations: Location[];
    public phoneNumbers: PhoneNumbers[];
}

export class Employee {
    public employeeId: string;
    public company: Company;
    public cpf: string;
    public rg: string;
    public descricao: string;
    public name: string;
    public isManager: boolean;
    public image: string;
    public link: string;
    public locations: Location[];
    public phoneNumbers: PhoneNumbers[];
    public employeeServices: Service[];
}
