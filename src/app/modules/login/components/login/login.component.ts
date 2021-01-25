import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {User} from '../../../shared/models/User';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {Authentication, UserAuthenticated} from '../../../shared/models/authentication/authentication';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {Title} from '@angular/platform-browser';
import {NotificationService} from '../../../shared/services/notification/notification-service.service';
import {DeviceService} from '../../../shared/services/device/device.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user: User;
    public formLogin: FormGroup;
    public eyeHide = true;

    public userLogged: boolean;
    private userAuthenticated: UserAuthenticated;

    constructor(private authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private sessionService: SessionService,
                private dialog: MatDialog,
                private title: Title,
                private router: Router,
                private notificationService: NotificationService,
                private deviceService: DeviceService) {
    }


    ngOnInit(): void {
        this.userLogged = this.sessionService.isAuthenticated;
        if (this.userLogged) {
            this.router.navigate(['perfil']);
        } else {
            this.title.setTitle('Login | Me Agenda Aí');
            this.formLogin = this.createForm(new Authentication());
        }
    }

    // retorna todos os controls do form
    get form(): { [control: string]: AbstractControl } {
        return this.formLogin.controls;
    }

    private createForm(authentication: Authentication): FormGroup {
        return this.fb.group({
            email: new FormControl(authentication.email, [Validators.required, Validators.email]),
            senha: new FormControl(authentication.password, [Validators.required])
        });
    }

    public esqueceuSenha(): void {
        this.router.navigate(['esqueceu-senha']);
    }

    public onSubmit(authentication: Authentication): void {
        if (this.formLogin.valid) {
            this.authenticationService.login(authentication).subscribe((response: ResponseBase<UserAuthenticated>) => {
                if (response.success) {
                    this.userAuthenticated = response.result;
                    console.log(this.userAuthenticated.message);

                    this.sessionService.authenticated(this.userAuthenticated.authenticated);
                    this.sessionService.setUser(this.userAuthenticated);
                    this.sessionService.setRefreshToken(this.userAuthenticated.refreshToken);
                    this.sessionService.setToken(this.userAuthenticated.token);

                    this.router.navigate(['perfil']);
                } else {
                    this.deviceService.desktop ?
                        this.notificationService.showMessageMatDialog('', response.result.toString()) :
                        this.notificationService.showMessageSnackBar(response.result.toString());
                }
            }, e => {
                console.log(e.error.result);
                console.log(this.deviceService.deviceInfo);
                console.log(this.deviceService.type);
                this.deviceService.desktop ?
                    this.notificationService.showMessageMatDialog('', e.error.result) :
                    this.notificationService.showMessageSnackBar(e.error.result, true);
            });
        } else {
            GenericValidator.verifierValidatorsForm(this.formLogin);
        }
    }
}
