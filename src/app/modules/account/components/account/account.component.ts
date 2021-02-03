import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {Title} from '@angular/platform-browser';
import {UserAccount} from '../../../shared/models/user-account.class';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    private userAuthenticated: UserAuthenticated;
    public user: UserAccount;

    constructor(private title: Title, private userService: UserService, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.title.setTitle('Conta | Me Agenda Aí');
        this.userAuthenticated = this.sessionService.userAuthenticated;
        this.userService.getAccount(this.userAuthenticated.id).subscribe((response: ResponseBase<UserAccount>) => {
            if (response.success) {
                console.log(response.message);
                this.user = response.result;
            }
        }, error => {
            console.log(error);
        });
    }

}
