import {Component, OnInit} from '@angular/core';
import {ResponseBase} from '../../../shared/models/response-base';
import {Scheduling} from '../../../shared/models/scheduling';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication';
import {Roles} from '../../../shared/enums/roles.enum';
import {SchedulingService} from '../../../shared/services/scheduling.service';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {DeviceService} from '../../../shared/services/device/device.service';

@Component({
    selector: 'app-historic',
    templateUrl: './historic.component.html',
    styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
    private user: UserAuthenticated;
    public historicScheduling: Scheduling[];

    constructor(private sessionService: SessionService, private schedulingService: SchedulingService,
                private notificationService: NotificationService, private deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this.user = this.sessionService.userAuthenticated;
        this.getHistoricScheduling(this.user.role);
    }

    private getHistoricScheduling(role: number): void {
        switch (this.user.role) {
            case Roles.Cliente:
                this.getHistoricSchedulingByClient(this.user.id);
                break;
            case Roles.Funcionario:
                this.getHistoricSchedulingByEmployee(this.user.id);
                break;
            case Roles.UsuarioEmpresa:
                break;
            default:
                break;
        }
    }

    private getHistoricSchedulingByClient(id: string): void {
        this.schedulingService.getHistoricClientSchedulingsByUserId(id)
            .subscribe((response: ResponseBase<Scheduling[]>) => {
                if (response.success) {
                    console.log(response.message);
                    this.historicScheduling = response.result;
                } else {
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.message) :
                        this.notificationService.showMessageSnackBar(response.message, true);
                }
            }, e => {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', e.error.error) :
                    this.notificationService.showMessageSnackBar(e.error.error, true);
            });
    }

    private getHistoricSchedulingByEmployee(id: string): void {
        this.schedulingService.getHistoricEmplooyeeSchedulingsByUserId(id)
            .subscribe((response: ResponseBase<Scheduling[]>) => {
                if (response.success) {
                    console.log(response.message);
                    this.historicScheduling = response.result;
                } else {
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.message) :
                        this.notificationService.showMessageSnackBar(response.message, true);
                }
            }, e => {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', e.error.error) :
                    this.notificationService.showMessageSnackBar(e.error.error, true);
            });
    }
}
