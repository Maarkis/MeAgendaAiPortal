export class AddServicesToEmployee {
    public employeeId: string;
    public servicesIds: string[];

    constructor(employee: string) {
        this.employeeId = employee;
    }
}
