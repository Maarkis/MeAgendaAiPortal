import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {UserAuthenticated} from '../../../models/authentication/authentication';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    public userLogged: UserAuthenticated;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.userLogged = this.sessionService.userAuthenticated;
    }

    public getNAmeAndSurname(userName: string): string {
        const names = userName.split(' ');
        const prep = ['de', 'da', 'do', 'das', 'dos'];
        names.forEach(n => {
            prep.forEach(p => {
                if (n === p) {
                    names.splice(names.indexOf(n), 1);
                }
            });
        });
        return names.slice(0, 2).join(' ');

    }
}
