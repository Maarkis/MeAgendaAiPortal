export class NewScheduling {
    public userId: string;
    public employeeId: string;
    public serviceId: string;
    public startTime: string;
    public endTime: string;

    constructor(employeeId: string) {
        this.employeeId = employeeId;
    }
}
