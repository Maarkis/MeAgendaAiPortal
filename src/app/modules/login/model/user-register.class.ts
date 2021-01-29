import {PhoneNumbers} from '../../shared/models/phone-numbers.class';
import {Location} from '../../shared/models/location.class';

export class UserRegister {
    public email: string;
    public password: string;
    public confirmPassword: string;
    public name: string;
    public cpf: string;
    public rg: string;
    public image: string;
    public location: Location[];
    public phoneNumbers: PhoneNumbers[];
}
