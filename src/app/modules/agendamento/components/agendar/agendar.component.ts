import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../shared/services/company.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {Company, Employee, Services} from '../../../shared/models/Company';
import {NewScheduling} from '../../../shared/models/new-scheduling';
import * as moment from 'moment';
import {Moment} from 'moment';
import {LoginComponent} from '../../../login/components/login/login.component';
import {SessionService} from '../../../shared/services/session.service';
import {SchedulingService} from '../../../shared/services/scheduling.service';
import {Scheduling} from '../../../shared/models/scheduling';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication';

@Component({
    selector: 'app-agendar',
    templateUrl: './agendar.component.html',
    styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {

    public companies: Company;
    public employees: Employee[];
    public selectEmployee: string = null;

    public servicesEmployee: Services[];
    public selectService: string = null;

    public personImageDatabase = [
        {
            id: 1,
            url: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            sexo: 'M'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
            sexo: 'M'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=644&q=80',
            sexo: 'F'
        }
    ];
    public horariosDisponiveis = [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30'
    ];

    public dateSelect: moment.Moment = null;
    private endTime: moment.Moment = null;
    public selectHoras: string = null;

    public newScheduling: NewScheduling;
    private userAuthenticated: UserAuthenticated;
    public scheduling: Scheduling;


    constructor(private companyService: CompanyService,
                private sessionService: SessionService,
                private schedulingService: SchedulingService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        console.log('Componente inicializado com sucesso!');
        this.companyService.getCompanyComplete('1507E04E-8E52-4044-847D-BFDE38F64BDE')
            .subscribe((response: ResponseBase<Company>) => {
                if (response.success) {
                    this.companies = response.result;
                    this.employees = response.result.employees;
                }
            }, error => {
                console.log(error);
            });
    }

    findImage(id: number): string {
        const image = this.personImageDatabase.find(f => f.id === id);
        if (image) {
            return image.url;
        }
    }

    setEmployee(employeeId: string) {
        this.selectEmployee = employeeId;
        this.listServiceEmployye(this.selectEmployee);
    }

    private listServiceEmployye(selectEmployee: string) {
        const employee = this.companies.employees.find(f => f.employeeId === selectEmployee);
        if (employee) {
            this.selectService = null;
            this.dateSelect = null;
            this.servicesEmployee = employee.employeeServices;
        }
    }

    setService(serviceId: string) {
        this.selectService = serviceId;
    }

    addEvent(event) {
        console.log('Event: ', event);
        const date = moment(event, 'yyyy-MM-dd');
        this.dateSelect = date;
        console.log('Date: ', date);

    }

    setStartTime(horas: string) {
        this.selectHoras = horas;
        const arrayHoras = horas.split(':');
        const newDate = this.dateSelect.toDate();
        newDate.setHours(Number(arrayHoras[0]), Number(arrayHoras[1]));
        this.dateSelect = moment(newDate);
        this.setEndTime(this.dateSelect);
    }


    private setEndTime(startTime: moment.Moment) {
        const service = this.servicesEmployee.find(f => f.serviceId === this.selectService);
        if (service) {
            this.endTime = startTime.clone();
            this.endTime.add(service.serviceDuration, 'minutes');
            console.log(this.dateSelect);
        }

        this.createScheduling();
    }

    private createScheduling() {
        this.newScheduling = new NewScheduling();
        this.newScheduling.employeeId = this.selectEmployee;
        this.newScheduling.serviceId = this.selectService;
        this.newScheduling.userId = this.userAuthenticated.id;
        this.newScheduling.startTime = this.dateSelect.format();
        this.newScheduling.endTime = this.endTime.format();
        console.log(this.newScheduling);
    }

    public agendar() {
        if (this.newScheduling) {
            this.schedulingService.createScheduling(this.newScheduling).subscribe((response: ResponseBase<Scheduling>) => {
                if (response.result) {
                    this.dialog.open(ModalComponent, {
                        panelClass: 'custom-modais', backdropClass: 'blur',
                        data: {
                            title: 'Pronto!',
                            text: 'Seu agendamento foi realizado com sucesso!',
                            button: 'Fechar',
                            route: ''
                        }
                    });
                }
            }, error => {
                console.log(error);
            });
        }
    }
}
