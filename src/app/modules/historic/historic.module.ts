import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoricComponent} from './components/historic/historic.component';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
    declarations: [HistoricComponent],
    imports: [
        CommonModule,
        BrowserModule
    ]
})
export class HistoricModule {
}
