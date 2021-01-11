import {Component, OnInit} from '@angular/core';
import {SchedulingService} from '../../../shared/services/scheduling.service';
import {SessionService} from '../../../shared/services/session.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {Scheduling, SchedulingStatus} from '../../../shared/models/scheduling';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-meus-agendamentos',
    templateUrl: './meus-agendamentos.component.html',
    styleUrls: ['./meus-agendamentos.component.css']
})
export class MeusAgendamentosComponent implements OnInit {
    private userId: string;
    public scheduling: Scheduling[];

    constructor(private schedulingService: SchedulingService,
                private dialog: MatDialog, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.getScheduling();
    }

    private getScheduling() {
        this.schedulingService.getClientSchedulingsByUserId(this.userId = this.sessionService.getUserId())
            .subscribe((response: ResponseBase<Scheduling[]>) => {
                if (response.success) {
                    this.scheduling = response.result;
                    console.log(response.result);
                }
            }, error => {
                console.log(error);
            });
    }

    cancelSchedule(schedule: Scheduling) {

        const updateScheduling = {
            schedulingId: schedule.schedulingId,
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
