import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../shared/services/client/client.service';
import {CepService} from '../../../shared/services/cep/cep.service';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {DeviceService} from '../../../shared/services/device/device.service';
import {MASKS, NgBrazilValidators} from 'ng-brazil';
import {CompanyRegister} from '../../model/company-register.class';
import {UserRegister} from '../../model/user-register.class';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {Location} from '../../../shared/models/location.class';
import {PhoneNumbers} from '../../../shared/models/phone-numbers.class';
import {Ng2TelInput} from 'ng2-tel-input';
import {CEP} from '../../../shared/models/cep/CEP.class';
import {CompanyService} from '../../../shared/services/company/company.service';

@Component({
    selector: 'app-register-company',
    templateUrl: './register-company.component.html',
    styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
    public MASKS = MASKS;
    public formGroupCompanyRegister: FormGroup;
    public eyeHide = true;
    public step = 1;
    public phone: string;

    constructor(private router: Router, private fb: FormBuilder, private companyService: CompanyService,
                private cepService: CepService, private notificationService: NotificationService,
                private deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this.formGroupCompanyRegister = this.createForm(new CompanyRegister());
    }

    public goBack(): void {
        this.router.navigate(['']);
    }

    get form(): { [control: string]: AbstractControl } {
        return this.formGroupCompanyRegister.controls;
    }

    get getPhoneNumbers(): FormArray {
        return this.form.phoneNumbers as FormArray;
    }

    get getLocation(): FormArray {
        return this.form.locations as FormArray;
    }
    public goToLogin(): void {
        this.router.navigate(['login']);
    }
    private createForm(company: CompanyRegister) {
        return this.fb.group({
            Name: new FormControl(company.name, [Validators.required]),
            email: new FormControl(company.email, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(company.password, [
                Validators.required
            ]),
            confirmPassword: new FormControl(company.confirmPassword, [
                Validators.required
            ]),
            imagem: new FormControl(company.imagem = null, []),
            limitCancelHours: new FormControl(company.limitCancelHours = 24, []),
            cnpj: new FormControl(company.cnpj, [
                Validators.required,
                NgBrazilValidators.cnpj
            ]),
            descricao: new FormControl(company.descricao, [Validators.required]),
            locations: this.fb.array([Location.createFormBuilderLocation(this.fb, new Location())], []),
            phoneNumbers: this.fb.array([PhoneNumbers.createFormBuilderPhoneNumbers(this.fb, new PhoneNumbers())], [])
        }, {
            validators: [
                GenericValidator.equalControlValue('password', 'confirmPassword')
            ]
        });
    }


    public nextStep(step: number): void {
        console.log(this.formGroupCompanyRegister);
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

    public onSubmit(company: CompanyRegister): void {
        if (this.formGroupCompanyRegister.valid) {
            this.companyService.addCompany(company).subscribe((response: ResponseBase<string>) => {
                if (response.success) {
                    console.log(response.message);
                    this.router.navigate(['login'], {queryParams: {email: company.email}});
                } else {
                    console.log(response.message);
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.message) :
                        this.notificationService.showMessageSnackBar(response.message);
                }
            }, error => {
                console.log(error);
            });
        } else {
            GenericValidator.verifierValidatorsForm(this.formGroupCompanyRegister);
        }
    }
}
