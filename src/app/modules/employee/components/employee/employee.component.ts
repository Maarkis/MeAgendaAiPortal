import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee/employee.service';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {MatDialog} from '@angular/material/dialog';
import {ModalAddEmployeeComponent} from '../modal/modal-add-employee/modal-add-employee.component';
import {DeviceService} from '../../../shared/services/device/device.service';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {ListEmployee} from '../../model/list-employee.class';
import {ModalAddServicesToEmployeeComponent} from '../modal/modal-add-services-to-employee/modal-add-services-to-employee.component';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {Roles} from '../../../shared/enums/roles.enum';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    private userAuthenticated: UserAuthenticated;

    public employees: ListEmployee[];

    constructor(private title: Title,
                private sessionService: SessionService,
                private employeeService: EmployeeService,
                private dialog: MatDialog,
                private deviceService: DeviceService,
                private router: Router,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.title.setTitle('Funcionários | Me Agenda Aí');
        this.userAuthenticated = this.sessionService.userAuthenticated;
        this.getEmployeesByCompany(this.userAuthenticated.secondaryId);
    }

    private getEmployeesByCompany(companyId: string) {
        this.employeeService.getEmployeesByCompanyId(companyId).subscribe((response: ResponseBase<ListEmployee[]>) => {
            if (response.success) {
                console.log(response.message);
                this.employees = response.result;
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, e => {
            console.log(e);
        });
    }

    public addEmployee(): void {
        const dialogRef = this.dialog.open(ModalAddEmployeeComponent, {
            panelClass: 'custom-modal-register', backdropClass: '', height: 'auto', width: 'auto',
            data: {
                companyId: this.userAuthenticated.secondaryId,
            }
        });
        dialogRef.afterClosed().subscribe(response => {
            this.getEmployeesByCompany(this.userAuthenticated.secondaryId);
        }, error => {
            console.log(error);
        });
    }

    public addServiceToEmployee(employeeId: string): void {
        const dialogRef = this.dialog.open(ModalAddServicesToEmployeeComponent, {
            panelClass: 'custom-modal-register', backdropClass: '', height: 'auto', width: 'auto',
            data: {
                companyId: this.userAuthenticated.secondaryId,
                employeeId
            }
        });
        dialogRef.afterClosed().subscribe(response => {
            this.getEmployeesByCompany(this.userAuthenticated.secondaryId);
        }, error => {
            console.log(error);
        });
    }

    public getLink(link: string): string {
        return link;
    }
    public goToPerfilEmployee(employeeId: string): void {
        this.router.navigate([`perfil/${employeeId}/${Roles.Funcionario}`]);
    }
}
