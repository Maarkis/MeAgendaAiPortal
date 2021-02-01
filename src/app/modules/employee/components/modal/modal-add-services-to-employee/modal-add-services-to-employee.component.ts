import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CepService} from '../../../../shared/services/cep/cep.service';
import {DeviceService} from '../../../../shared/services/device/device.service';
import {NotificationService} from '../../../../shared/services/notification/notification-service.service';

@Component({
    selector: 'app-modal-add-services-to-employee',
    templateUrl: './modal-add-services-to-employee.component.html',
    styleUrls: ['./modal-add-services-to-employee.component.css']
})
export class ModalAddServicesToEmployeeComponent implements OnInit {
    private employeeId: string;
    private companyId: string;

    constructor(public dialogRef: MatDialogRef<ModalAddServicesToEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private employeeService: EmployeeService,
                private router: Router, private fb: FormBuilder, private cepService: CepService,
                private deviceService: DeviceService, private notificationService: NotificationService) {
        if (data.companyId) {
            this.companyId = data.companyId;
        }
        if (data.employeeId) {
            this.employeeId = data.employeeId;
        }
    }

    ngOnInit(): void {
        console.log(this.employeeId);
        console.log(this.companyId);
    }

}
