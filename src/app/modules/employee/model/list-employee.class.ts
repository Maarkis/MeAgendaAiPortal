import {Company, Services} from '../../shared/models/company.class';


export class ListEmployee {
    public employeeId: string;
    public link: string;
    public name: string;
    public email: string;
    public descricao: string;
    public image: File;
    public services: Services[];
    public company: Company;


}
