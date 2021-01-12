import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public userLogged: boolean;

    constructor(private title: Title, private sessionService: SessionService, private router: Router) {
    }

    ngOnInit(): void {
        this.userLogged = this.sessionService.isAuthenticated;
        if (this.userLogged) {
            this.router.navigate(['components']);
        } else {
            this.title.setTitle('Página Inicial | Me Agenda Aí');
        }
    }

}
