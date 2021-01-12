import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {$} from 'protractor';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): void {
    }

    public logoff(): void {
        this.sessionService.logoff();
    }

    public toggleMenu(e: MouseEvent): void {
        e.preventDefault();
        const element = document.getElementById('wrapper');
        if (element.classList.contains('toggled')) {
            element.classList.remove('toggled');
        } else {
            element.classList.add('toggled');
        }
    }
}
