import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AccountComponent} from './components/account/account.component';
import {BrowserModule} from '@angular/platform-browser';
import { ModalEditNameComponent } from './components/modal/modal-edit-name/modal-edit-name.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    declarations: [
        AccountComponent,
        ModalEditNameComponent
    ],
    exports: [
        DatePipe
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class AccountModule {
}
