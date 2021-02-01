import {ServicesModel} from './services-model.class';

export class AddMultipleServicesModel {
    public companyId: string;
    services: ServicesModel[];

    constructor(companyId: string) {
        this.companyId = companyId;
    }
}


