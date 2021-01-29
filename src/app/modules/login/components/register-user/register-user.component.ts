import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserRegister} from '../../model/user-register.class';
import {Location} from '../../../shared/models/location.class';
import {PhoneNumbers} from '../../../shared/models/phone-numbers.class';


@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

    public formGroupUserRegister: FormGroup;

    constructor(private router: Router, private fb: FormBuilder) {
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

    public onSubmit(user: UserRegister): void {

    }

    private createForm(userRegister: UserRegister) {
        return this.fb.group({
            name: new FormControl(userRegister.name, [Validators.required]),
            email: new FormControl(userRegister.email, [Validators.required]),
            password: new FormControl(userRegister.password, [Validators.required]),
            confirmPassword: new FormControl(userRegister.confirmPassword, [Validators.required]),
            cpf: new FormControl(userRegister.cpf, [Validators.required]),
            rg: new FormControl(userRegister.rg, [Validators.required]),
            image: new FormControl(userRegister.image, []),
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
}


