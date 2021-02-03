import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../../shared/models/company.class';
import {PhoneNumbers} from '../../../../shared/models/phone-numbers.class';
import {Router} from '@angular/router';
import {UserAuthenticated} from '../../../../shared/models/authentication/authentication.class';
import {Roles} from '../../../../shared/enums/roles.enum';

@Component({
    selector: 'app-company-profile',
    templateUrl: './company-profile.component.html',
    styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

    @Input() public company: Company;
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
        this.router.navigate(['agendar'], {queryParams: {companyId: this.company.companyId}});
    }
}
