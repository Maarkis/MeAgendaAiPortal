import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgendamentoModule} from './modules/agendamento/agendamento.module';
import {LoginModule} from './modules/login/login.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
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
        HttpClientModule
    ],

    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
