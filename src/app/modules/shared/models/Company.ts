export class Company {
    public companyId: string;
    public companyName: string;
    public CPF: string;
    public CNPJ: string;
    public limitCancelHours: number;
    public companyServices: Services[];
    public employees: Employee[];
}
export class Services {
    public serviceId: string;
    public serviceName: string;
    public serviceDuration: number;
}
export class Employee {
    public employeeId: string;
    public emplyeeName: string;
    public isManager: boolean;
    public employeeServices: Services[];
}
