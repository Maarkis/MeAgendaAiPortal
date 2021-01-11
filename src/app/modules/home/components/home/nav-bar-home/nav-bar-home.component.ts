import {Component, OnInit} from '@angular/core';
import {ModalLoginComponent} from '../../modal/modal-login/modal-login.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-nav-bar-home',
    templateUrl: './nav-bar-home.component.html',
    styleUrls: ['./nav-bar-home.component.css']
})
export class NavBarHomeComponent implements OnInit {

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    public login(): void {
        this.dialog.open(ModalLoginComponent, {
            panelClass: 'custom-modal', backdropClass: '', height: 'auto', width: '479px',
            data: {}
        });
    }
}
