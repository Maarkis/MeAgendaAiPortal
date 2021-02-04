import {Component, OnInit} from '@angular/core';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {Scheduling, SchedulingStatus} from '../../../shared/models/scheduling.class';
import {SchedulingService} from '../../../shared/services/scheduling.service';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {DeviceService} from '../../../shared/services/device/device.service';
import {Roles} from '../../../shared/enums/roles.enum';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

    public schedules: Scheduling[];
    private user: UserAuthenticated;
    public roles = Roles;
    public role: Roles;

    constructor(private title: Title, private schedulingService: SchedulingService,
                private dialog: MatDialog, private sessionService: SessionService,
                private notificationService: NotificationService, private deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this.title.setTitle('Meus agendamentos | Me Agenda Aí');
        this.user = this.sessionService.userAuthenticated;
        this.role = this.user.role;
        this.getScheduling(this.role);
    }

    private getScheduling(role: number): void {
        switch (role) {
            case Roles.Cliente:
                this.getSchedulingClient(this.user.id);
                break;
            case Roles.Funcionario:
                this.getSchedulingEmployee(this.user.id);
                break;
            case Roles.UsuarioEmpresa:
                break;
            default:
                break;
        }
    }

    public cancelSchedule(scheduling: Scheduling): void {
        const updateScheduling = {
            schedulingId: scheduling.schedulingId,
            newStatus: SchedulingStatus.Canceled
        };
        this.schedulingService.updateSchedulingStatus(updateScheduling).subscribe((response: ResponseBase<any>) => {
            if (response.success) {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('Pronto', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
                this.getScheduling(this.role);
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, error => {
            console.log(error);
        });
    }

    private getSchedulingEmployee(id: string): void {
        this.schedulingService.getEmplooyeeSchedulingsByUserId(id)
            .subscribe((response: ResponseBase<Scheduling[]>) => {
                if (response.success) {
                    console.log(response.message);
                    this.schedules = response.result;
                } else {
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.message) :
                        this.notificationService.showMessageSnackBar(response.message, true);
                }
            }, e => {
                console.log(e);
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', e.error.error) :
                    this.notificationService.showMessageSnackBar(e.error.error, true);
            });
    }

    private getSchedulingClient(id: string): void {
        this.schedulingService.getClientSchedulingsByUserId(id)
            .subscribe((response: ResponseBase<Scheduling[]>) => {
                if (response.success) {
                    console.log(response.message);
                    this.schedules = response.result;
                } else {
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.message) :
                        this.notificationService.showMessageSnackBar(response.message, true);
                }
            }, e => {
                console.log(e);
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', e.error.error) :
                    this.notificationService.showMessageSnackBar(e.error.error, true);
            });
    }


}
