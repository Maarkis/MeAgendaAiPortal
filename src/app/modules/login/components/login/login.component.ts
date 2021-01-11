import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {User} from '../../../shared/models/User';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Authentication} from '../../model/authentication';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user: User;
    formLogin: FormGroup;

    constructor(private authentication: AuthenticationService,
                private fb: FormBuilder,
                private sessionService: SessionService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.formLogin = this.createForm(new Authentication());
    }

    get form() {
        return this.formLogin.controls;
    }

    private createForm(authentication: Authentication): FormGroup {
        return this.fb.group({
            email: new FormControl(authentication.email, [Validators.required, Validators.email]),
            password: new FormControl(authentication.password, [Validators.required])
        });
    }
}
