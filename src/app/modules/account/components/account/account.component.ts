import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {ResponseBase} from '../../../shared/models/response-base.class';
import {Title} from '@angular/platform-browser';
import {UserAccount} from '../../../shared/models/user-account.class';
import {ModalAddServicesToEmployeeComponent} from '../../../employee/components/modal/modal-add-services-to-employee/modal-add-services-to-employee.component';
import {MatDialog} from '@angular/material/dialog';
import {ModalEditNameComponent} from '../modal/modal-edit-name/modal-edit-name.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    private userAuthenticated: UserAuthenticated;
    public user: UserAccount;

    constructor(private title: Title, private userService: UserService, private sessionService: SessionService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.title.setTitle('Conta | Me Agenda Aí');
        this.userAuthenticated = this.sessionService.userAuthenticated;

        this.getAccount(this.userAuthenticated.id);
    }

    private getAccount(userId: string): void {
        this.userService.getAccount(this.userAuthenticated.id).subscribe((response: ResponseBase<UserAccount>) => {
            if (response.success) {
                console.log(response.message);
                this.user = response.result;
            }
        }, error => {
            console.log(error);
        });
    }

    public editName(userId: string): void {
        const dialogRef = this.dialog.open(ModalEditNameComponent, {
            panelClass: 'custom-modal-register', backdropClass: '', height: 'auto', width: 'auto',
            data: {
                userId
            }
        });
        dialogRef.afterClosed().subscribe(response => {
            this.getAccount(this.userAuthenticated.id);
        }, error => {
            console.log(error);
        });
    }
}
