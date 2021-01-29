import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
// Intercerceptor
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './modules/shared/interceptor/auth-interceptor';
import {AppointmentsModule} from './modules/appointments/appointments.module';


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
        MatDialogModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
