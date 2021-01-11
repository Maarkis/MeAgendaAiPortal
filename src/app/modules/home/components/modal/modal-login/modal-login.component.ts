import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Route, Router} from '@angular/router';

@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.component.html',
    styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

    constructor(private matDialogRef: MatDialogRef<ModalLoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
                private dialog: MatDialog, private router: Router) {
    }

    ngOnInit(): void {
    }

    public close(): void {
        this.matDialogRef.close();
    }

    public goToLogin(): void {
        this.close();
        this.router.navigate(['login']);
    }

}
