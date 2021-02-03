import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../shared/services/session.service';
import {EmployeeService} from '../../../shared/services/employee/employee.service';
import {MatDialog} from '@angular/material/dialog';
import {DeviceService} from '../../../shared/services/device/device.service';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {CompanyService} from '../../../shared/services/company/company.service';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {ModalAddServicesComponent} from '../modal/modal-add-services/modal-add-services.component';
import {Service} from '../../../shared/models/service.class';
import {Title} from '@angular/platform-browser';
import {Roles} from '../../../shared/enums/roles.enum';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
    private userAuthenticated: UserAuthenticated;

    public listServices: Service[];
    public roles = Roles;

    constructor(private title: Title, private sessionService: SessionService, private companyService: CompanyService,
                private employeeService: EmployeeService, private dialog: MatDialog,
                private deviceService: DeviceService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.title.setTitle('Serviços | Me Agenda Aí');
        this.userAuthenticated = this.sessionService.userAuthenticated;
        switch (this.userAuthenticated.role) {
            case Roles.Funcionario:
                this.getServicesFromEmployee(this.userAuthenticated.secondaryId);
                break;
            case Roles.UsuarioEmpresa:
                this.getServicesFromCompany(this.userAuthenticated.secondaryId);
                break;
            default:
                break;
        }
    }


    private getServicesFromCompany(companyId: string) {
        this.companyService.getServicesFromCompany(companyId).subscribe((response: ResponseBase<Service[]>) => {
            if (response.success) {
                this.listServices = response.result;
                console.log(this.listServices);
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, error => {
            console.log(error);
        });
    }

    private getServicesFromEmployee(employeeId: string) {
        this.employeeService.getEmployeeServices(employeeId).subscribe((response: ResponseBase<Service[]>) => {
            if (response.success) {
                this.listServices = response.result;
                console.log(this.listServices);
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, error => {
            console.log(error);
        });
    }

    public addServices(): void {
        const dialogRef = this.dialog.open(ModalAddServicesComponent, {
            panelClass: 'custom-modal-register', backdropClass: '', height: 'auto', width: 'auto',
            data: {
                companyId: this.userAuthenticated.secondaryId
            }
        });
        dialogRef.afterClosed().subscribe(response => {
            this.getServicesFromCompany(this.userAuthenticated.secondaryId);
        }, error => {
            console.log(error);
        });
    }

    public hidder(): boolean {
        return this.userAuthenticated.role !== Roles.Funcionario;
    }
}
