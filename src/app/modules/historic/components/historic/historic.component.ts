import {Component, OnInit} from '@angular/core';
import {ResponseBase} from '../../../shared/models/response-base';
import {Scheduling} from '../../../shared/models/scheduling';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication';

@Component({
    selector: 'app-historic',
    templateUrl: './historic.component.html',
    styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
    private user: UserAuthenticated;
    public historicScheduling: Scheduling[];

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.user = this.sessionService.userAuthenticated;
        this.getHistoric(this.user.id);
    }

    private getScheduling() {
        // this.schedulingService.getClientSchedulingsByUserId(this.userId)
        //     .subscribe((response: ResponseBase<Scheduling[]>) => {
        //         if (response.success) {
        //             this.schedules = response.result;
        //             console.log(response.result);
        //         }
        //     }, error => {
        //         console.log(error);
        //     });
    }

    private getHistoric(id: string): void {

    }
}
