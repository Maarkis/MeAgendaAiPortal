import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../../../shared/services/device/device.service';
import {NotificationService} from '../../../../shared/services/notification/notification-service.service';
import {AddServicesToEmployee} from '../../../model/add-services-to-employee.class';
import {CompanyService} from '../../../../shared/services/company/company.service';
import {ResponseBase} from '../../../../shared/models/response-base.class';
import {Service} from '../../../../shared/models/service.class';
import {ModalAddServicesComponent} from '../../../../services/components/modal/modal-add-services/modal-add-services.component';

@Component({
    selector: 'app-modal-add-services-to-employee',
    templateUrl: './modal-add-services-to-employee.component.html',
    styleUrls: ['./modal-add-services-to-employee.component.css']
})
export class ModalAddServicesToEmployeeComponent implements OnInit {
    private readonly employeeId: string;
    private readonly companyId: string;

    public formGroupAddServicesToEmployee: FormGroup;

    public listServices: Service[];

    public msgError: string;

    public listServicesEmployee: Service[];

    constructor(public dialogRef: MatDialogRef<ModalAddServicesToEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private employeeService: EmployeeService,
                private router: Router, private fb: FormBuilder,
                private companyService: CompanyService,
                private deviceService: DeviceService, private notificationService: NotificationService,
                private dialog: MatDialog) {
        if (data.employeeId) {
            this.employeeId = data.employeeId;
        }
        if (data.companyId) {
            this.companyId = data.companyId;
        }
    }

    ngOnInit(): void {
        this.getServicesFromCompany(this.companyId);
        this.getEmployeeServices(this.employeeId);
    }


    get form(): { [control: string]: AbstractControl } {
        return this.formGroupAddServicesToEmployee.controls;
    }

    private createForm(addServicesToEmployee: AddServicesToEmployee, listServicesEmployee: Service[]): FormGroup {
        return this.fb.group({
            employeeId: new FormControl(addServicesToEmployee.employeeId, [Validators.required]),
            servicesIds: this.fb.array(this.getServicesId(listServicesEmployee), [])
        });
    }

    private getServicesId(listServicesEmployee: Service[]): string[] {
        if (listServicesEmployee) {
            const arr = [];
            listServicesEmployee.forEach(service => {
                arr.push(service.serviceId);
            });
            return arr;
        }
        return [];
    }

    public addServices(): void {
        const dialogRef = this.dialog.open(ModalAddServicesComponent, {
            panelClass: 'custom-modal-register', backdropClass: '', height: 'auto', width: 'auto',
            data: {
                companyId: this.companyId
            }
        });
        dialogRef.afterClosed().subscribe(response => {
            this.getServicesFromCompany(this.companyId);
        }, error => {
            console.log(error);
        });
    }

    private getServicesFromCompany(companyId: string): void {
        this.companyService.getServicesFromCompany(companyId).subscribe((response: ResponseBase<Service[]>) => {
            if (response.success) {
                console.log(response.message);
                this.listServices = response.result;
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, error => {
            console.log(error);
        });
    }

    private getEmployeeServices(employeeId: string): void {
        this.employeeService.getEmployeeServices(employeeId).subscribe((response: ResponseBase<any>) => {
            if (response.success) {
                console.log(response.message);
                this.listServicesEmployee = response.result;

                this.formGroupAddServicesToEmployee = this.createForm(
                    new AddServicesToEmployee(this.employeeId),
                    this.listServicesEmployee);
                console.log(this.formGroupAddServicesToEmployee);
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, error => {
            console.log(error);
        });
    }

    public addServiceToEmployee(serviceId: string): void {
        const services = this.form.servicesIds as FormArray;
        if (services) {
            const service = services.controls.find(s => s.value === serviceId);
            if (!service) {
                services.push(this.fb.control(serviceId));
            } else {
                services.removeAt(services.controls.findIndex(f => f.value === serviceId));
            }
        }
    }

    public saveService(addServicesToEmployee: AddServicesToEmployee): void {
        if (this.formGroupAddServicesToEmployee.valid) {
            this.employeeService.addServicesToEmployee(addServicesToEmployee).subscribe((response: ResponseBase<string>) => {
                if (response.success) {
                    this.close();
                } else {
                    this.msgError = response.message;
                }
            }, error => {
                console.log(error);
            });
        }
    }

    public close(): void {
        this.dialogRef.close();
    }

    public checkServiceToEmployee(serviceId: string): boolean {
        return !!this.listServicesEmployee.find(f => f.serviceId === serviceId);
    }


}
