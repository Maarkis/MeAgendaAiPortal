import {Company} from '../../shared/models/company.class';
import {Service} from '../../shared/models/service.class';


export class ListEmployee {
    public employeeId: string;
    public link: string;
    public name: string;
    public email: string;
    public descricao: string;
    public image: File;
    public services: Service[];
    public company: Company;

}
