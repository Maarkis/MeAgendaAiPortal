import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {Roles} from '../../../shared/enums/roles.enum';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public roles = Roles;
    private userAuthenticated: UserAuthenticated;

    constructor(private title: Title, private sessionService: SessionService, private router: Router) {
    }

    ngOnInit(): void {
        this.userAuthenticated = this.sessionService.userAuthenticated;
        if (this.userAuthenticated) {
            this.setRouteToRoles(this.userAuthenticated.role);
        } else {
            this.title.setTitle('Página Inicial | Me Agenda Aí');
        }
    }

    private setRouteToRoles(role: Roles): void {
        switch (role) {
            case Roles.Cliente:
                this.router.navigate(['meus-agendamentos']);
                break;
            case Roles.UsuarioEmpresa:
                this.router.navigate([`perfil/${this.userAuthenticated.secondaryId}/${this.userAuthenticated.role}`]);
                break;
            case Roles.Funcionario:
                this.router.navigate([`perfil/${this.userAuthenticated.secondaryId}/${this.userAuthenticated.role}`]);
                break;
            default:
                break;
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
