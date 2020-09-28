import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';

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

    logoff() {
        this.sessionService.logoff();
    }
}
