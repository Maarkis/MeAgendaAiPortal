import {NgModule} from '@angular/core';
import {AppointmentsComponent} from './components/appointments/appointments.component';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [AppointmentsComponent],
    imports: [
        CommonModule
    ]
})
export class AppointmentsModule {
}
