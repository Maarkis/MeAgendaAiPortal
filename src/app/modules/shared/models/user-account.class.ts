import {Roles} from '../enums/roles.enum';
import {PhoneNumbers} from './phone-numbers.class';
import {Location} from './location.class';

export class UserAccount {
    public userId: string;
    public email: string;
    public name: string;
    public image: string;
    public roles: Roles[];
    public createAt: Date;
    public phoneNumbers: PhoneNumbers[];
    public locations: Location[];
}
