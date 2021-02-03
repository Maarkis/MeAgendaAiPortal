import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {menuContentClient, menuContentEmpresa} from '../../constants/menu/menus.constants';
import {MenuContent} from '../../models/menu/menu-content.class';
import {UserAuthenticated} from '../../models/authentication/authentication.class';
import {Roles} from '../../enums/roles.enum';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
    @ViewChild('sidenav') public sidenav: MatSidenav;
    public opened = false;
    public menuItem: string;
    public menuConfig = {
        mode: 'push', // over, push, side
        hasBackdrop: false
    };
    public menuContent: MenuContent[];


    private user: UserAuthenticated;

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
        // Get type menus
        this.user = this.sessionService.userAuthenticated;
        this.menuContent = this.user.role === Roles.Cliente ? menuContentClient : menuContentEmpresa;
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

    public openMenu(): void {
        this.opened ? this.sidenav.close() : this.sidenav.open();
    }

    public getLink(routerLink: string): string {
        if (routerLink.includes('perfil')) {
            return `${routerLink}/${this.user.secondaryId}/${this.user.role}`;
        }
        return routerLink;
    }
}
