import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {Roles} from '../../../shared/enums/roles.enum';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public userLogged: boolean;
    public roles = Roles;

    constructor(private title: Title, private sessionService: SessionService, private router: Router) {
    }

    ngOnInit(): void {
        this.userLogged = this.sessionService.isAuthenticated;
        if (this.userLogged) {
            this.router.navigate(['perfil']);
        } else {
            this.title.setTitle('Página Inicial | Me Agenda Aí');
        }
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
    }
}
