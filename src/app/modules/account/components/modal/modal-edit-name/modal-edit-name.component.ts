import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../../shared/services/company/company.service';
import {DeviceService} from '../../../../shared/services/device/device.service';
import {NotificationService} from '../../../../shared/services/notification/notification-service.service';
import {UserService} from '../../../../shared/services/user/user.service';
import {AddServicesToEmployee} from '../../../../employee/model/add-services-to-employee.class';
import {Service} from '../../../../shared/models/service.class';
import {EditName} from '../../model/edit-name.class';
import {ResponseBase} from '../../../../shared/models/response-base.class';

@Component({
    selector: 'app-modal-edit-name',
    templateUrl: './modal-edit-name.component.html',
    styleUrls: ['./modal-edit-name.component.css']
})
export class ModalEditNameComponent implements OnInit {
    private readonly userId: string;
    public formGroupEditName: FormGroup;

    constructor(public dialogRef: MatDialogRef<ModalEditNameComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router, private fb: FormBuilder,
                private userService: UserService,
                private deviceService: DeviceService, private notificationService: NotificationService) {
        if (data.userId) {
            this.userId = data.userId;
        }
    }

    ngOnInit(): void {
        this.formGroupEditName = this.createForm(new EditName(this.userId));
        console.log(this.formGroupEditName);
    }

    get form(): { [control: string]: AbstractControl } {
        return this.formGroupEditName.controls;
    }

    private createForm(editName: EditName): FormGroup {
        return this.fb.group({
            id: new FormControl(editName.id, [Validators.required]),
            name: new FormControl(editName.name, [Validators.required]),
        });
    }

    public onSubmit(editName: EditName): void {
        this.userService.editaName(editName).subscribe((response: ResponseBase<string>) => {
            if (response.success) {
                console.log(response.message);
                this.close();
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, error => {
            console.log(error);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }
}
