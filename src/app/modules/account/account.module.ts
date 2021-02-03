import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AccountComponent} from './components/account/account.component';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
    declarations: [
        AccountComponent
    ],
    exports: [
        DatePipe
    ],
    imports: [
        BrowserModule,
        CommonModule
    ]
})
export class AccountModule {
}
