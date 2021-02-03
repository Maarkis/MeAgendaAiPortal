import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhoneNumbers} from '../../../shared/models/phone-numbers.class';
import {Roles} from '../../../shared/enums/roles.enum';
import {EmployeeService} from '../../../shared/services/employee/employee.service';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {Employee} from '../../../shared/models/company.class';

@Component({
    selector: 'app-employee-profile-public',
    templateUrl: './employee-profile-public.component.html',
    styleUrls: ['./employee-profile-public.component.css']
})
export class EmployeeProfilePublicComponent implements OnInit {

    private uid: string;
    public employee: Employee;

    constructor(private employeeService: EmployeeService, private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getEmployeeComplete(this.uid = this.route.snapshot.paramMap.get('uid'));
    }

    public getPhone(phone: PhoneNumbers): string {
        return `+${phone.countryCode} (${phone.ddd}) ${phone.number}`;
    }


    public goToLogin(): void {
        this.router.navigate(['login'], {queryParams: {uid: this.uid, role: Roles.Funcionario}});
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
}
