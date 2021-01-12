import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {User} from '../../../shared/models/User';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Authentication, UserAuthenticated} from '../../../shared/models/authentication/authentication';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user: User;
    formLogin: FormGroup;
    public eyeHide = true;

    public userLogged: boolean;

    private userAuthenticated: UserAuthenticated;

    constructor(private authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private sessionService: SessionService,
                private dialog: MatDialog,
                private title: Title,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userLogged = this.sessionService.isAuthenticated;
        if (this.userLogged) {
            this.router.navigate(['components']);
        } else {
            this.title.setTitle('Login | Me Agenda Aí');
            this.formLogin = this.createForm(new Authentication());
        }
    }

    // retorna todos os controls do form
    get form() {
        return this.formLogin.controls;
    }

    private createForm(authentication: Authentication): FormGroup {
        return this.fb.group({
            email: new FormControl(authentication.email, [Validators.required, Validators.email]),
            senha: new FormControl(authentication.password, [Validators.required])
        });
    }

    public onSubmit(authentication: Authentication): void {
        if (this.formLogin.valid) {
            this.authenticationService.login(authentication).subscribe((response: ResponseBase<UserAuthenticated>) => {
                if (response.success) {
                    this.userAuthenticated = response.result;
                    console.log(this.userAuthenticated.message);

                    this.sessionService.authenticated(this.userAuthenticated.authenticated);
                    this.sessionService.setUser(this.userAuthenticated);
                    this.sessionService.setToken(this.userAuthenticated.token);

                    this.router.navigate(['components']);
                } else {
                    this.dialog.open(ModalComponent, {
                        panelClass: 'custom-modal', backdropClass: '', height: 'auto', width: 'auto',
                        data: {
                            title: '', text: response.result,
                            button: 'OK', route: ''
                        }
                    });
                }
            }, error => {
                console.log(error);
            });
        } else {
            GenericValidator.verifierValidatorsForm(this.formLogin);
        }
    }
}
