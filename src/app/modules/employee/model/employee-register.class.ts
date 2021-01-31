import {Location} from '../../shared/models/location.class';
import {PhoneNumbers} from '../../shared/models/phone-numbers.class';

export class EmployeeRegister {
    public email: string;
    public password: string;
    public confirmPassword: string;
    public name: string;
    public cpf: string;
    public rg: string;
    public isManager: boolean;
    public descricao: string;
    public companyId: string;
    public imagem: File;
    public locations: Location[];
    public phoneNumbers: PhoneNumbers[];

    constructor(companyId: string) {
        this.companyId = companyId;
    }
}
