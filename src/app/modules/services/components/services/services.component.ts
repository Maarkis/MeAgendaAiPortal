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

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
    private userAuthenticated: UserAuthenticated;

    public listServices: Service[];

    constructor(private sessionService: SessionService, private companyService: CompanyService,
                private employeeService: EmployeeService, private dialog: MatDialog,
                private deviceService: DeviceService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.userAuthenticated = this.sessionService.userAuthenticated;
        this.getServicesFromCompany(this.userAuthenticated.secondaryId);
    }


    private getServicesFromCompany(companyId: string) {
        this.companyService.getServicesFromCompany(companyId).subscribe((response: ResponseBase<Service[]>) => {
            if (response.success) {
                this.listServices = response.result;
                console.log(this.listServices);
            } else {

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
}
