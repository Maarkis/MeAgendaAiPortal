import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserRegister} from '../../model/user-register.class';
import {Location} from '../../../shared/models/location.class';
import {PhoneNumbers} from '../../../shared/models/phone-numbers.class';
import {ClientService} from '../../../shared/services/client/client.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {MASKS, NgBrazilValidators} from 'ng-brazil';
import {Ng2TelInput} from 'ng2-tel-input';
import {CepService} from '../../../shared/services/cep/cep.service';
import {CEP} from '../../../shared/models/cep/CEP';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {DeviceService} from '../../../shared/services/device/device.service';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
    public MASKS = MASKS;
    public formGroupUserRegister: FormGroup;
    public eyeHide = true;
    public step = 1;
    public phone: string;

    constructor(private router: Router, private fb: FormBuilder, private clientService: ClientService,
                private cepService: CepService, private notificationService: NotificationService,
                private deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this.formGroupUserRegister = this.createForm(new UserRegister());
        console.log(this.formGroupUserRegister);
    }

    public goBack(): void {
        this.router.navigate(['']);
    }

    get form(): { [control: string]: AbstractControl } {
        return this.formGroupUserRegister.controls;
    }

    get getPhoneNumbers(): FormArray {
        return this.form.phoneNumbers as FormArray;
    }

    get getLocation(): FormArray {
        return this.form.locations as FormArray;
    }

    public onSubmit(user: UserRegister): void {
        if (this.formGroupUserRegister.valid) {
            this.clientService.addClient(user).subscribe((response: ResponseBase<string>) => {
                if (response.success) {
                    console.log(response.message);
                    this.router.navigate(['login'], {queryParams: {email: user.email}});
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
            GenericValidator.verifierValidatorsForm(this.formGroupUserRegister);
        }
    }

    private createForm(userRegister: UserRegister) {
        return this.fb.group({
            Name: new FormControl(userRegister.name, [Validators.required]),
            email: new FormControl(userRegister.email, [Validators.required]),
            password: new FormControl(userRegister.password, [Validators.required]),
            confirmPassword: new FormControl(userRegister.confirmPassword, [Validators.required]),
            imagem: new FormControl(userRegister.imagem = null, []),
            cpf: new FormControl(userRegister.cpf, [
                Validators.required,
                NgBrazilValidators.cpf
            ]),
            rg: new FormControl(userRegister.rg, [Validators.required]),
            // image: new FormControl(userRegister.image, []),
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

    public goToLogin(): void {
        this.router.navigate(['login']);
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
        console.log(obj);
    }

    public onCountryChange(item: AbstractControl, $event: any): void {
        console.log($event);
        console.log($event.dialCode);
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
}


