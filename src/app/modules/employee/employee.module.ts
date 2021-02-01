import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {TextMaskModule} from 'angular2-text-mask';
import {ModalAddEmployeeComponent} from './components/modal/modal-add-employee/modal-add-employee.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {MatRadioModule} from '@angular/material/radio';
import { ModalAddServicesToEmployeeComponent } from './components/modal/modal-add-services-to-employee/modal-add-services-to-employee.component';


@NgModule({
    declarations: [
        EmployeeComponent,
        ModalAddEmployeeComponent,
        ModalAddServicesToEmployeeComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        MatInputModule,
        TextMaskModule,
        MatButtonModule,
        FormsModule,
        Ng2TelInputModule,
        MatIconModule,
        MatRadioModule

    ],
    entryComponents: [
        ModalAddEmployeeComponent
    ],

})
export class EmployeeModule {
}
