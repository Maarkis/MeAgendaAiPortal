import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Roles} from '../../../../shared/enums/roles.enum';

@Component({
    selector: 'app-modal-register',
    templateUrl: './modal-register.component.html',
    styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

    public roles = Roles;

    constructor(private matDialogRef: MatDialogRef<ModalRegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
                private dialog: MatDialog, private router: Router) {
    }

    ngOnInit(): void {
    }

    public close(): void {
        this.matDialogRef.close();
    }

    public goToRegister(role: Roles): void {
        switch (role) {
            case Roles.Cliente:
                this.router.navigate(['register-user']);
                break;
            case Roles.UsuarioEmpresa:
                this.router.navigate(['register-company']);
                break;
            default:
                break;
        }
        this.close();
    }
}
