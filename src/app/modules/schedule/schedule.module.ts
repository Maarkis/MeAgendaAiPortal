import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {ScheduleByCompanyComponent} from './components/schedule/schedule-by-company/schedule-by-company.component';
import {ScheduleByEmployeeComponent} from './components/schedule/schedule-by-employee/schedule-by-employee.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleByCompanyComponent,
        ScheduleByEmployeeComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        MatInputModule,
        MatDatepickerModule,
        FormsModule,
        MatButtonModule
    ]

})
export class ScheduleModule {
}
