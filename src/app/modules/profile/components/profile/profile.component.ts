import {Component, OnInit} from '@angular/core';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';
import {UserService} from '../../../shared/services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Roles} from '../../../shared/enums/roles.enum';
import {CompanyService} from '../../../shared/services/company/company.service';
import {EmployeeService} from '../../../shared/services/employee/employee.service';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {Company, Employee} from '../../../shared/models/company.class';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public userAuthentication: UserAuthenticated;

    private uid: string;

    public role: Roles;
    public roles = Roles;

    public company: Company = null;
    public employee: Employee = null;

    constructor(private title: Title, private dialog: MatDialog, private sessionService: SessionService,
                private companyService: CompanyService,
                private employeeService: EmployeeService,
                private sanitizer: DomSanitizer, private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.title.setTitle('Perfil | Me Agenda Aí');
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.role = Number(this.route.snapshot.paramMap.get('role')) === Roles.UsuarioEmpresa ? Roles.UsuarioEmpresa : Roles.Funcionario;
        this.userAuthentication = this.sessionService.userAuthenticated;

        switch (this.role) {
            case Roles.Funcionario:
                this.getEmployeeComplete(this.uid);
                break;
            case Roles.UsuarioEmpresa:
                this.getCompanyComplete(this.uid);
                break;
            default:
                break;
        }
    }

    private getEmployeeComplete(uid: string): void {
        this.employeeService.getEmployeeComplete(uid).subscribe((response: ResponseBase<Employee>) => {
            if (response.success) {
                console.log(response.message);
                this.employee = response.result;
            } else {

            }
        }, error => {
            console.log(error);
        });
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
}
