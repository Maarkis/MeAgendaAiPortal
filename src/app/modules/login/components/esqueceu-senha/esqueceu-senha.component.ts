import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Authentication} from '../../../shared/models/authentication/authentication.class';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';

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
                private dialog: MatDialog,
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
            email: new FormControl('', [Validators.required]),
        });
    }

    public onSubmit(email: string): void {
        if (this.formForgotPassword.valid) {
            this.authenticationService.recoverPassword(email).subscribe((response: ResponseBase<string>) => {
                if (response.success) {
                    console.log(response.result);
                    this.dialog.open(ModalComponent, {
                        panelClass: 'custom-modal', backdropClass: '', height: 'auto', width: 'auto',
                        data: {
                            title: '', text: response.message,
                            button: 'OK', route: ''
                        }
                    });
                }
            }, responseError => {
                console.log(responseError.error.result);
                this.dialog.open(ModalComponent, {
                    panelClass: 'custom-modal', backdropClass: '', height: 'auto', width: 'auto',
                    data: {
                        title: '', text: responseError.error.result,
                        button: 'OK', route: ''
                    }
                });
            });
        } else {
            GenericValidator.verifierValidatorsForm(this.formForgotPassword);
        }
    }

    public goBack(): void {
        this.router.navigate(['login']);
    }
}
