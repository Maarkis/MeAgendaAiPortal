// Intercerceptor
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './modules/shared/interceptor/auth-interceptor';
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from './modules/login/login.module';
import {HomeModule} from './modules/home/home.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {AgendamentoModule} from './modules/agendamento/agendamento.module';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {NgBrazil} from 'ng-brazil';
import {TextMaskModule} from 'angular2-text-mask';
import {CommonModule, registerLocaleData} from '@angular/common';
import {AppointmentsModule} from './modules/appointments/appointments.module';
import {HistoricModule} from './modules/historic/historic.module';
import {VerifiedUserInterceptor} from './modules/shared/interceptor/verified-user.interceptor';
import {EmployeeModule} from './modules/employee/employee.module';
import {ServicesModule} from './modules/services/services.module';
import {ProfileModule} from './modules/profile/profile.module';
import {ScheduleModule} from './modules/schedule/schedule.module';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {AccountModule} from './modules/account/account.module';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        AgendamentoModule,
        BrowserAnimationsModule,
        LoginModule,
        HttpClientModule,
        HomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        Ng2TelInputModule,
        NgBrazil,
        TextMaskModule,
        BrowserModule,
        CommonModule,
        AppointmentsModule,
        HistoricModule,
        EmployeeModule,
        ServicesModule,
        ProfileModule,
        ScheduleModule,
        AccountModule

    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: VerifiedUserInterceptor, multi: true},
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: LOCALE_ID, useValue: 'pt-BR' }, // replace "en-US" with your locale
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
