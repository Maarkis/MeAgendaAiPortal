import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-agendar',
    templateUrl: './agendar.component.html',
    styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {


    constructor() {
    }


    ngOnInit(): void {
        console.log('Componente inicializado com sucesso! Agenda');

    }

}
