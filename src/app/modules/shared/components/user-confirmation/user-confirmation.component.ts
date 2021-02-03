import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-confirmation',
    templateUrl: './user-confirmation.component.html',
    styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    public goToLogin(): void {
        this.router.navigate(['login']);

    }
}
