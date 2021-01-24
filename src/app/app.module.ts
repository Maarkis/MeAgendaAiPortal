import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from './modules/login/login.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeModule} from './modules/home/home.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MeusAgendamentosComponent} from './modules/meus-agendamentos/components/meus-agendamentos/meus-agendamentos.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AgendamentoModule} from './modules/agendamento/agendamento.module';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthInterceptor} from './modules/shared/interceptor/auth-interceptor';


@NgModule({
    declarations: [
        AppComponent,
        MeusAgendamentosComponent
    ],
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        CommonModule,
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
    providers: [{
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
