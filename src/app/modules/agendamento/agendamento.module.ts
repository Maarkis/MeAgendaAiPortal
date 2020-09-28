import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendarComponent} from './components/agendar/agendar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { MeusAgendamentosComponent } from './components/meus-agendamentos/meus-agendamentos.component';

@NgModule({
    declarations: [AgendarComponent, MeusAgendamentosComponent],
    imports: [
        MatProgressSpinnerModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class AgendamentoModule {
}
