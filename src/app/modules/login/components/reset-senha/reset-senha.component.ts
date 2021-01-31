import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {AuthenticationService} from '../../services/authentication.service';
import {RequestResetPassword} from '../../../shared/models/authentication/request-reset-password.class';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';

@Component({
    selector: 'app-reset-senha',
    templateUrl: './reset-senha.component.html',
    styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {
    private uui: string;
    private token: string;

    public formResetPassword: FormGroup;
    public eyeHide = true;


    constructor(private route: ActivatedRoute,
                private router: Router, private fb: FormBuilder,
                private dialog: MatDialog,
                private sessionService: SessionService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.uui = this.route.snapshot.paramMap.get('uid');
        this.token = this.route.snapshot.paramMap.get('token');
        this.formResetPassword = this.createForm(new RequestResetPassword(this.uui, this.token));
    }

    private createForm(resetPassword: RequestResetPassword): FormGroup {
        return this.fb.group({
            id: new FormControl(resetPassword.Id, [Validators.required]),
            token: new FormControl(resetPassword.token, [Validators.required]),
            password: new FormControl(resetPassword.password, [Validators.required]),
            confirmPassword: new FormControl(resetPassword.confirmPassword,
                [Validators.required, GenericValidator.mustMatch('confirmPassword')])
        }, {
            validators: [
                GenericValidator.equalControlValue('password', 'confirmPassword')
            ]
        });
    }

    public onSubmit(resetPassword: RequestResetPassword): void {
        this.authenticationService.resetPassword(resetPassword).subscribe((response: ResponseBase<string>) => {
            if (response.success) {
                console.log(response.result);
                this.sessionService.setTokenResetPassword({token: resetPassword.token, used: true});
                this.router.navigate(['login']);
            } else {
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
    }

    public goBack(): void {
        this.router.navigate(['']);
    }
}
