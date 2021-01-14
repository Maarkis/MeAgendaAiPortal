import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {$} from 'protractor';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
    public opened = false;
    public menuItem: string;

    constructor(private sessionService: SessionService, private router: Router) {
    }

    ngOnInit(): void {
        const fragments = this.router.url.split('/');
        if (fragments) {
            fragments.forEach(obj => {
                if (obj === '') {
                    fragments.splice(fragments.indexOf(obj), 1);
                }
            });
        }
        this.menuItem = '/' + fragments[0];
    }

    public logoff(): void {
        this.sessionService.logoff();
    }

    public toggleMenu(e: MouseEvent): void {
        e.preventDefault();
        const element = document.getElementById('wrapper');
        if (element.classList.contains('toggled')) {
            element.classList.remove('toggled');
            this.opened = true;
        } else {
            this.opened = false;
            element.classList.add('toggled');
        }
    }

    public setMenuCurrent(menu: string): void {
        this.menuItem = menu;
    }
}
