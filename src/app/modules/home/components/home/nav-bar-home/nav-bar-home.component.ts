import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalRegisterComponent} from '../../modal/modal-register/modal-register.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav-bar-home',
    templateUrl: './nav-bar-home.component.html',
    styleUrls: ['./nav-bar-home.component.css']
})
export class NavBarHomeComponent implements OnInit {

    constructor(private dialog: MatDialog, private router: Router) {
    }

    ngOnInit(): void {
    }

    public goToLogin(): void {
        this.router.navigate(['login']);
    }

    public register(): void {
        this.dialog.open(ModalRegisterComponent, {
            panelClass: 'custom-modal', backdropClass: '', height: 'auto', width: '479px'
        });
    }


    public goToAbout(): void {
        this.router.navigate(['about']);

    }
}
