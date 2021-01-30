import {NgModule} from '@angular/core';
import {AppointmentsComponent} from './components/appointments/appointments.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';



@NgModule({
    declarations: [AppointmentsComponent],
    imports: [
        BrowserModule,
        CommonModule
    ]
})
export class AppointmentsModule {
}
