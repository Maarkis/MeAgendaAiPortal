import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Authentication} from '../../../shared/models/authentication/authentication';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';

@Component({
    selector: 'app-esqueceu-senha',
    templateUrl: './esqueceu-senha.component.html',
    styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {
    public formForgotPassword: FormGroup;

    constructor(private title: Title,
                private authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {

        this.title.setTitle('Esqueceu a senha | Me Agenda Aí');
        this.formForgotPassword = this.createForm();
    }

    get form(): { [control: string]: AbstractControl } {
        return this.formForgotPassword.controls;
    }

    private createForm(): FormGroup {
        return this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    public onSubmit(value): void {
        if (this.formForgotPassword.valid) {
            console.log(value);
        } else {
            GenericValidator.verifierValidatorsForm(this.formForgotPassword);
        }
    }

    public goBack(): void {
        this.router.navigate(['login']);
    }
}
