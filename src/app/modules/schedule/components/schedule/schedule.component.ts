import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewScheduling} from '../../../shared/models/new-scheduling.class';
import {Scheduling} from '../../../shared/models/scheduling.class';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    public companyId: string = null;
    public employeeId: string = null;

    public newScheduling: NewScheduling;
    public userAuthenticated: UserAuthenticated;

    constructor(private route: ActivatedRoute, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.companyId = this.route.snapshot.queryParamMap.get('companyId');
        this.employeeId = this.route.snapshot.queryParamMap.get('employeeId');
        this.newScheduling = new NewScheduling(this.employeeId ? this.employeeId : '');
        this.userAuthenticated = this.sessionService.userAuthenticated;
    }

}
