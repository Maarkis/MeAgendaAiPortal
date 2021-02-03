import {Component, Input, OnInit} from '@angular/core';
import {NewScheduling} from '../../../../shared/models/new-scheduling.class';
import {UserAuthenticated} from '../../../../shared/models/authentication/authentication.class';

@Component({
    selector: 'app-schedule-by-employee',
    templateUrl: './schedule-by-employee.component.html',
    styleUrls: ['./schedule-by-employee.component.css']
})
export class ScheduleByEmployeeComponent implements OnInit {

    @Input() public employeeId: string;
    @Input() public newScheduling: NewScheduling;
    @Input() public userAuthenticated: UserAuthenticated;

    constructor() {
    }

    ngOnInit(): void {
        console.log('ScheduleByEmployeeComponent', this.employeeId);
    }

}
