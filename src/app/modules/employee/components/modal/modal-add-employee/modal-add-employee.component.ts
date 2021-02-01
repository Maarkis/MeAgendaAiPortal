import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeRegister} from '../../../model/employee-register.class';
import {NgBrazilValidators, MASKS} from 'ng-brazil';
import {Location} from '../../../../shared/models/location.class';
import {PhoneNumbers} from '../../../../shared/models/phone-numbers.class';
import {GenericValidator} from '../../../../shared/validators/validator-form/generic-validator.validator';
import {CEP} from '../../../../shared/models/cep/CEP.class';
import {Ng2TelInput} from 'ng2-tel-input';
import {CepService} from '../../../../shared/services/cep/cep.service';
import {EmployeeService} from '../../../../shared/services/employee/employee.service';
import {ResponseBase} from '../../../../shared/models/response-base.class';
import {DeviceService} from '../../../../shared/services/device/device.service';
import {NotificationService} from '../../../../shared/services/notification/notification-service.service';
import {ModalAddServicesToEmployeeComponent} from '../modal-add-services-to-employee/modal-add-services-to-employee.component';
import {ClosingConfirmationModalComponent} from '../../../../shared/components/closing-confirmation-modal/closing-confirmation-modal.component';


@Component({
    selector: 'app-modal-add-employee',
    templateUrl: './modal-add-employee.component.html',
    styleUrls: ['./modal-add-employee.component.css']
})
export class ModalAddEmployeeComponent implements OnInit {

    private readonly companyId: string;

    public eyeHide = true;
    public step = 1;
    public phone: string;
    public MASKS = MASKS;
    public formGroupEmployeeRegister: FormGroup;

    private employeeId: string;

    constructor(public dialogRef: MatDialogRef<ModalAddEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private employeeService: EmployeeService,
                private dialog: MatDialog,
                private router: Router, private fb: FormBuilder, private cepService: CepService,
                private deviceService: DeviceService, private notificationService: NotificationService) {
        if (data.companyId) {
            this.companyId = data.companyId;
        }
    }

    ngOnInit(): void {
        this.formGroupEmployeeRegister = this.createForm(new EmployeeRegister(this.companyId));
        console.log(this.formGroupEmployeeRegister);
    }

    public goBack(): void {
        this.router.navigate(['']);
    }

    get form(): { [control: string]: AbstractControl } {
        return this.formGroupEmployeeRegister.controls;
    }

    get getPhoneNumbers(): FormArray {
        return this.form.phoneNumbers as FormArray;
    }

    get getLocation(): FormArray {
        return this.form.locations as FormArray;
    }

    private createForm(employeeRegister: EmployeeRegister): FormGroup {
        return this.fb.group({
            companyId: new FormControl(employeeRegister.companyId, [Validators.required]),
            isManager: new FormControl(employeeRegister.isManager, [Validators.required]),
            name: new FormControl(employeeRegister.name, [Validators.required]),
            descricao: new FormControl(employeeRegister.descricao, []),
            email: new FormControl(employeeRegister.email, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(employeeRegister.password, [Validators.required]),
            confirmPassword: new FormControl(employeeRegister.confirmPassword, [Validators.required]),
            imagem: new FormControl(employeeRegister.imagem = null, []),
            cpf: new FormControl(employeeRegister.cpf, [
                Validators.required,
                NgBrazilValidators.cpf
            ]),
            rg: new FormControl(employeeRegister.rg, [Validators.required]),
            locations: this.fb.array([Location.createFormBuilderLocation(this.fb, new Location())], []),
            phoneNumbers: this.fb.array([PhoneNumbers.createFormBuilderPhoneNumbers(this.fb, new PhoneNumbers())], [])
        }, {
            validators: [
                GenericValidator.equalControlValue('password', 'confirmPassword')
            ]
        });
    }

    public getCep(cep: string, itemLocation: AbstractControl): void {
        cep = cep.replace('.', '');
        this.cepService.getCep(cep).subscribe((response: CEP) => {
            if (response) {
                this.setValueLocation(response, itemLocation);
            }
        }, error => {
            console.log(error);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }

    public nextStep(step: number): void {
        this.step = step + 1;
    }

    public backStep(step: number): void {
        this.step = step - 1;
    }

    public getNumber(item: AbstractControl, phone: string) {
        const x = phone.split(')');
        const ddd = x[0].replace('(', '').trim();
        item.get('ddd').setValue(ddd);
        console.log(item);
        item.get('number').setValue(x[1]);
    }

    public telInputObject(obj: Ng2TelInput): void {
    }

    public onCountryChange(item: AbstractControl, $event: any): void {
        item.get('countryCode').setValue($event.dialCode);
    }

    private setValueLocation(location: CEP, itemLocation: AbstractControl): void {
        itemLocation.patchValue({
            country: 'Brasil',
            state: location.uf,
            city: location.localidade,
            neighbourhood: location.bairro,
            street: location.logradouro,
            cep: location.cep
        });
    }

    public onSubmit(employeeRegister: EmployeeRegister): void {
        this.employeeService.addEmployee(employeeRegister).subscribe((response: ResponseBase<string>) => {
            if (response.success) {
                console.log(response.message);
                this.employeeId = response.result;
                // this.close();
                this.confirmModal();
            } else {
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', response.message) :
                    this.notificationService.showMessageSnackBar(response.message, true);
            }
        }, e => {
            console.log(e);
        });
    }


    public confirmModal(): void {
        const dialogRef = this.dialog.open(ClosingConfirmationModalComponent, {
            panelClass: 'custom-modal', backdropClass: '', height: 'auto', width: 'auto',
            data: {}
        });
        dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.addServiceToEmployee(this.employeeId);
            } else {
                this.close();
            }
        });
    }

    public addServiceToEmployee(employeeId: string): void {
        this.dialog.open(ModalAddServicesToEmployeeComponent, {
            panelClass: 'custom-modal-register', backdropClass: '', height: 'auto', width: 'auto',
            data: {
                companyId: this.companyId,
                employeeId
            }
        });
        this.close();
    }
}
