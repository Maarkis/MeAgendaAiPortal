import {Component, OnInit} from '@angular/core';
import {ResponseBase} from '../../../shared/models/response-base';
import {Scheduling, SchedulingStatus} from '../../../shared/models/scheduling';
import {SchedulingService} from '../../../shared/services/scheduling.service';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';
import {ModalComponent} from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-meus-agendamentos',
    templateUrl: './meus-agendamentos.component.html',
    styleUrls: ['./meus-agendamentos.component.css']
})
export class MeusAgendamentosComponent implements OnInit {

    public schedules: Scheduling[];


    constructor(private schedulingService: SchedulingService,
                private dialog: MatDialog, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.getScheduling();
    }

    private getScheduling() {
        const userAuthenticated = this.sessionService.userAuthenticated;
        this.schedulingService.getClientSchedulingsByUserId(userAuthenticated.id)
            .subscribe((response: ResponseBase<Scheduling[]>) => {
                if (response.success) {
                    this.schedules = response.result;
                    console.log(response.result);
                }
            }, error => {
                console.log(error);
            });
    }

    public cancelSchedule(scheduling: Scheduling): void {
        const updateScheduling = {
            schedulingId: scheduling.schedulingId,
            newStatus: SchedulingStatus.Canceled
        };
        console.log(updateScheduling);
        this.schedulingService.updateSchedulingStatus(updateScheduling).subscribe((response: ResponseBase<any>) => {
            if (response.success) {
                const dialogRef = this.dialog.open(ModalComponent, {
                    panelClass: 'custom-modais', backdropClass: 'blur',
                    data: {
                        title: 'Pronto!',
                        text: response.result,
                        button: 'Fechar',
                        route: ''
                    }
                });
                dialogRef.afterClosed().subscribe(resp => {
                    this.getScheduling();
                }, error => {
                    console.log(error);
                });
            }
        }, error => {
            console.log(error);
        });
    }

}
