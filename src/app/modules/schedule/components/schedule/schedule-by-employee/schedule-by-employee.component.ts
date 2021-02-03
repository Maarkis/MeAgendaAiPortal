import {Component, Input, OnInit} from '@angular/core';
import {NewScheduling} from '../../../../shared/models/new-scheduling.class';
import {UserAuthenticated} from '../../../../shared/models/authentication/authentication.class';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {ResponseBase} from '../../../../shared/models/response-base.class';
import {Employee} from '../../../../shared/models/company.class';
import {Service} from '../../../../shared/models/service.class';
import * as moment from 'moment';
import {Scheduling} from '../../../../shared/models/scheduling.class';
import {Router} from '@angular/router';
import {SchedulingService} from '../../../../shared/services/scheduling.service';

@Component({
    selector: 'app-schedule-by-employee',
    templateUrl: './schedule-by-employee.component.html',
    styleUrls: ['./schedule-by-employee.component.css']
})
export class ScheduleByEmployeeComponent implements OnInit {

    @Input() public employeeId: string;
    @Input() public newScheduling: NewScheduling;
    @Input() public userAuthenticated: UserAuthenticated;

    public listServices: Service[];
    public listEmployee: Employee[];
    public dateNow = Date();
    public dateSelect: Date;
    public listAvailableHours: Date[];
    public availableHoursSelect: Date;


    public serviceSelect: Service;
    public employeeSelect: Employee;

    constructor(private employeeService: EmployeeService,
                private router: Router,
                private schedulingService: SchedulingService) {
    }

    ngOnInit(): void {
        console.log('ScheduleByEmployeeComponent', this.employeeId);
        this.getEmployeeComplete(this.employeeId);
        this.getServiceByEmployee(this.employeeId);
    }

    private getEmployeeComplete(employeeId: string): void {
        this.employeeService.getEmployeeComplete(employeeId).subscribe((response: ResponseBase<Employee>) => {
            if (response.success) {
                console.log(response.message);
                this.employeeSelect = response.result;
                this.newScheduling.employeeId = this.employeeSelect.employeeId;
            } else {
                // TODO
            }
        }, error => {
            console.log(error);
        });
    }

    private getServiceByEmployee(employeeId: string): void {
        this.employeeService.getEmployeeServices(employeeId).subscribe((response: ResponseBase<Service[]>) => {
            if (response.success) {
                console.log(response.message);
                this.listServices = response.result;
            } else {
                // TODO
            }
        }, error => {
            console.log(error);
        });
    }

    public setServiceId(serviceId: string, service: Service): void {
        this.newScheduling.serviceId = serviceId;
        this.serviceSelect = service;
    }

    public getEmployeeAvailableHours(): void {
        this.employeeService.getEmployeeAvailableHours(
            this.newScheduling.employeeId,
            this.newScheduling.serviceId,
            this.dateSelect).subscribe((response: ResponseBase<Date[]>) => {
            if (response.success) {
                console.log(response.message);
                this.listAvailableHours = response.result;
            } else {

            }
        }, error => {
            console.log(error);
        });
    }

    public setStartTime(availableHoursSelect: Date): void {
        this.availableHoursSelect = availableHoursSelect;

        const horary = moment(availableHoursSelect);
        const hours = horary.get('hours');
        const minutes = horary.get('minutes');

        this.dateSelect.setHours(hours);
        this.dateSelect.setMinutes(minutes);

        this.newScheduling.startTime = moment(this.dateSelect).format();
        this.setEndTime(this.dateSelect);
    }

    private setEndTime(endTime: Date): void {
        const mEndTime = moment(endTime);
        mEndTime.add(this.serviceSelect.durationMinutes, 'minutes');
        this.newScheduling.endTime = mEndTime.format();
    }

    public createSchedule(newScheduling: NewScheduling): void {
        newScheduling.userId = this.userAuthenticated.id;
        this.schedulingService.createScheduling(this.newScheduling).subscribe((response: ResponseBase<Scheduling>) => {
            if (response.success) {
                console.log(response.message);
                this.router.navigate(['meus-agendamentos']);
            }
        }, error => {
            console.log(error);
        });
    }


}
