import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../../../../shared/models/company.class';
import {UserAuthenticated} from '../../../../shared/models/authentication/authentication.class';
import {Roles} from '../../../../shared/enums/roles.enum';
import {PhoneNumbers} from '../../../../shared/models/phone-numbers.class';
import {Router} from '@angular/router';

@Component({
    selector: 'app-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

    @Input() public employee: Employee;
    @Input() public userAuthenticated: UserAuthenticated;
    public roles = Roles;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    public getPhone(phone: PhoneNumbers): string {
        return `+${phone.countryCode} (${phone.ddd}) ${phone.number}`;
    }

    public goToService(): void {
        this.router.navigate(['servicos']);
    }

    public goToEmployee(): void {
        this.router.navigate(['funcionarios']);
    }

    public goToSchuling(): void {
        // TODO
    }
}
