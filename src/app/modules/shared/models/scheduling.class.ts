export class Scheduling {
    public clientName: string;
    public schedulingId: string;

    public companyLink: string;
    public employeeLink: string;
    public employeeName: string;
    public companyName: string;
    public service: string;
    public startTime: string;
    public endTime: string;
    public status: SchedulingStatus;

}

export enum SchedulingStatus {
    Scheduled,
    Canceled
}
