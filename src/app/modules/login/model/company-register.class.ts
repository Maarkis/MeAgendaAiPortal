import {Location} from '../../shared/models/location.class';
import {PhoneNumbers} from '../../shared/models/phone-numbers.class';

export class CompanyRegister {
    public email: string;
    public password: string;
    public confirmPassword: string;
    public name: string;
    public descricao: string;
    public cnpj: string;
    public limitCancelHours: number;
    public imagem: File;
    public locations: Location[];
    public phoneNumbers: PhoneNumbers[];
}
