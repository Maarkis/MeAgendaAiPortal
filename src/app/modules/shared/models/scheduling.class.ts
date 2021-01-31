export class Scheduling {
    public schedulingId: string;
    public clientName: string;
    public employeeName: string;
    public companyName: string;
    public service: string;
    public startTime: string;
    public endTime: string;
    public status: SchedulingStatus;

}
export enum SchedulingStatus
{
    Scheduled,
    Canceled
}
