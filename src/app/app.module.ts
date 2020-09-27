import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgendamentoModule} from './modules/agendamento/agendamento.module';
import {LoginModule} from './modules/login/login.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './modules/login/services/authentication.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AppRoutingModule,
        SharedModule,
        AgendamentoModule,
        BrowserAnimationsModule,
        LoginModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
