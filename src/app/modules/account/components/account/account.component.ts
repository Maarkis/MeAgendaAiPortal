import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {User} from '../../../shared/models/user.class';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    private userAuthenticated: UserAuthenticated;
    private user: User;

    constructor(private userService: UserService, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.userAuthenticated = this.sessionService.userAuthenticated;
        this.userService.getById(this.userAuthenticated.id).subscribe((response: ResponseBase<User>) => {
            if (response.success) {
                console.log(response.message);
                this.user = response.result;
            }
        }, error => {
            console.log(error);
        });

    }

}
