import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {User} from '../../../shared/models/User';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user: User;

    constructor(private authentication: AuthenticationService, private sessionService: SessionService, private router: Router) {
    }

    ngOnInit(): void {
    }

    login() {
        this.authentication.loginMock().subscribe((response: ResponseBase<User>) => {
            if (response.success) {
                console.log(response);
                this.user = response.result;
                this.sessionService.isLogged(true);
                this.sessionService.saveNameLocalStorage(this.user.name);
                this.sessionService.saveEmailLocalStorage(this.user.email);
                this.sessionService.saveUserIdLocalStorage(this.user.userId);

                this.router.navigate(['home']);

            }
        }, error => {
            console.log(error);
        });

    }
}
