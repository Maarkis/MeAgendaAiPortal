import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserRegister} from '../../model/user-register.class';
import {Location} from '../../../shared/models/location.class';
import {PhoneNumbers} from '../../../shared/models/phone-numbers.class';
import {ClientService} from '../../../shared/services/client/client.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';


@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

    public formGroupUserRegister: FormGroup;
    public eyeHide = true;
    public userPhoto: string = null;

    public step = 1;


    constructor(private router: Router, private fb: FormBuilder, private clientService: ClientService) {
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

    public onSubmit(user: UserRegister): void {
        console.log('Usuário: ', user);
        if (this.formGroupUserRegister.valid) {
            this.clientService.addClient(user).subscribe((response: ResponseBase<string>) => {
                if (response.success) {
                    console.log(response.message);
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
            name: new FormControl(userRegister.name, [Validators.required]),
            email: new FormControl(userRegister.email, [Validators.required]),
            password: new FormControl(userRegister.password, [Validators.required]),
            confirmPassword: new FormControl(userRegister.confirmPassword, [Validators.required]),
            cpf: new FormControl(userRegister.cpf, [Validators.required]),
            rg: new FormControl(userRegister.rg, [Validators.required]),
            // image: new FormControl(userRegister.image, []),
            location: this.fb.array([this.createLocation(new Location())], []),
            phoneNumbers: this.fb.array([this.createPhoneNumbers(new PhoneNumbers())], [])
        });
    }

    private createLocation(location: Location): FormGroup {
        return this.fb.group({
            cep: new FormControl(location.cep, [Validators.required]),
            name: new FormControl(location.name, [Validators.required]),
            country: new FormControl(location.country, [Validators.required]),
            state: new FormControl(location.state, [Validators.required]),
            city: new FormControl(location.city, [Validators.required]),
            neighbourhood: new FormControl(location.neighbourhood, [Validators.required]),
            street: new FormControl(location.street, [Validators.required]),
            numberComplement: new FormControl(location.numberComplement, [])
        });

    }

    private createPhoneNumbers(phoneNumbers: PhoneNumbers): FormGroup {
        return this.fb.group({
            countryCode: new FormControl(phoneNumbers.countryCode, [Validators.required]),
            ddd: new FormControl(phoneNumbers.ddd, [Validators.required]),
            nameContact: new FormControl(phoneNumbers.nameContact, [Validators.required]),
            number: new FormControl(phoneNumbers.number, [Validators.required]),
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

    public setValuePhone(item: AbstractControl, phone: HTMLInputElement): void {
        console.log(item);
        console.log(phone.value);

    }
}


