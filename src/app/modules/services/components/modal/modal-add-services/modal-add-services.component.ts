import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {Router} from '@angular/router';
import {CepService} from '../../../../shared/services/cep/cep.service';
import {DeviceService} from '../../../../shared/services/device/device.service';
import {NotificationService} from '../../../../shared/services/notification/notification-service.service';
import {AddMultipleServicesModel} from '../../../model/add-multiple-services-model.class';
import {ServicesModel} from '../../../model/services-model.class';
import {CompanyService} from '../../../../shared/services/company/company.service';
import {ResponseBase} from '../../../../shared/models/response-base.class';

@Component({
    selector: 'app-modal-add-services',
    templateUrl: './modal-add-services.component.html',
    styleUrls: ['./modal-add-services.component.css']
})
export class ModalAddServicesComponent implements OnInit {
    public formGroupAddService: FormGroup;
    private readonly companyId: string;

    constructor(public dialogRef: MatDialogRef<ModalAddServicesComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router, private fb: FormBuilder,
                private companyService: CompanyService,
                private deviceService: DeviceService, private notificationService: NotificationService) {
        if (data.companyId) {
            this.companyId = data.companyId;
        }
    }

    ngOnInit(): void {
        this.formGroupAddService = this.createForm(new AddMultipleServicesModel(this.companyId));
        console.log(this.formGroupAddService);
    }

    private createForm(addMultipleServicesModel: AddMultipleServicesModel) {
        return this.fb.group({
            companyId: new FormControl(addMultipleServicesModel.companyId, [Validators.required]),
            services: this.fb.array([ServicesModel.createFormBuildeServicesModel(this.fb, new ServicesModel())], [])
        });
    }

    public goBack(): void {
        this.router.navigate(['']);
    }

    get form(): { [control: string]: AbstractControl } {
        return this.formGroupAddService.controls;
    }

    get getServices(): FormArray {
        return this.form.services as FormArray;
    }

    public close(): void {
        this.dialogRef.close();
    }

    public onSubmit(addMultipleServicesModel: AddMultipleServicesModel) {
        console.log(addMultipleServicesModel);
        this.companyService.addServicesInCompany(addMultipleServicesModel).subscribe((response: ResponseBase<any>) => {
            if (response.success) {
                this.close();
            }
        }, error => {
            console.log(error);
        });
    }


}
