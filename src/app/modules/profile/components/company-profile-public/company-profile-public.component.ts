import {Component, OnInit} from '@angular/core';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {Company, Employee} from '../../../shared/models/company.class';
import {CompanyService} from '../../../shared/services/company/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PhoneNumbers} from '../../../shared/models/phone-numbers.class';
import {Roles} from '../../../shared/enums/roles.enum';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-company-profile-public',
    templateUrl: './company-profile-public.component.html',
    styleUrls: ['./company-profile-public.component.css']
})
export class CompanyProfilePublicComponent implements OnInit {

    public company: Company;
    private uid: string;
    private userAuthenticated: UserAuthenticated = null;

    constructor(private title: Title, private companyService: CompanyService, private router: Router,
                private route: ActivatedRoute, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.title.setTitle('Perfil | Me Agenda aí');
        this.uid = this.route.snapshot.paramMap.get('uid');

        this.userAuthenticated = this.sessionService.userAuthenticated;
        if (this.userAuthenticated) {
            this.goToLogin();
        } else {
            this.getCompanyComplete(this.uid);
        }

    }

    private getCompanyComplete(uid: string): void {
        this.companyService.getCompanyComplete(uid).subscribe((response: ResponseBase<Company>) => {
            if (response.success) {
                console.log(response.message);
                this.company = response.result;
            } else {

            }
        }, error => {
            console.log(error);
        });
    }

    public goToLogin(): void {
        this.router.navigate(['login'], {queryParams: {uid: this.uid, role: Roles.UsuarioEmpresa}});
    }

    public getPhone(phone: PhoneNumbers): string {
        return `+${phone.countryCode} (${phone.ddd}) ${phone.number}`;
    }
}
