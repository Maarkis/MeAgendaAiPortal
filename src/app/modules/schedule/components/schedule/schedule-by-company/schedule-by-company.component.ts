import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from '../../../../shared/services/company/company.service';
import {ResponseBase} from '../../../../shared/models/response-base.class';
import {Service} from '../../../../shared/models/service.class';
import {NewScheduling} from '../../../../shared/models/new-scheduling.class';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {Employee} from '../../../../shared/models/company.class';
import * as moment from 'moment';
import {SchedulingService} from '../../../../shared/services/scheduling.service';
import {Scheduling} from '../../../../shared/models/scheduling.class';
import {Router} from '@angular/router';
import {UserAuthenticated} from '../../../../shared/models/authentication/authentication.class';

@Component({
    selector: 'app-schedule-by-company',
    templateUrl: './schedule-by-company.component.html',
    styleUrls: ['./schedule-by-company.component.css']
})
export class ScheduleByCompanyComponent implements OnInit {

    @Input() public companyId: string;
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

    constructor(private companyService: CompanyService,
                private employeeService: EmployeeService,
                private router: Router,
                private schedulingService: SchedulingService) {
    }

    ngOnInit(): void {
        console.log('ScheduleByCompanyComponent', this.companyId);
        this.getServiceByCompany(this.companyId);
    }

    public getServiceByCompany(companyId: string): void {
        this.companyService.getServicesFromCompany(companyId).subscribe((response: ResponseBase<Service[]>) => {
            if (response.success) {
                console.log(response.message);
                this.listServices = response.result;
            } else {

            }
        }, error => {
            console.log(error);
        });
    }

    public getEmployeeByCompany(serviceId: string): void {
        this.employeeService.getEmployeesByServiceId(serviceId).subscribe((response: ResponseBase<Employee[]>) => {
            if (response.success) {
                console.log(response.message);
                this.listEmployee = response.result;
            }
        }, error => {
            console.log(error);
        });
    }

    public setServiceId(serviceId: string, service: Service): void {
        this.newScheduling.serviceId = serviceId;
        this.serviceSelect = service;
    }

    public setEmployee(employeeId: string, employee: Employee): void {
        this.newScheduling.employeeId = employeeId;
        this.employeeSelect = employee;
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
        console.log(endTime);
        const mEndTime = moment(endTime);
        console.log(mEndTime);
        mEndTime.add(this.serviceSelect.durationMinutes, 'minutes');
        console.log(mEndTime);
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
