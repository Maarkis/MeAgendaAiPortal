import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendarComponent} from './components/agendar/agendar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [AgendarComponent],
    imports: [
        MatProgressSpinnerModule,
        CommonModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class AgendamentoModule {
}
