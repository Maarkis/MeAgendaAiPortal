import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesComponent} from './components/services/services.component';
import {ModalAddServicesComponent} from './components/modal/modal-add-services/modal-add-services.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    declarations: [
        ServicesComponent,
        ModalAddServicesComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    entryComponents: [
        ModalAddServicesComponent
    ]
})
export class ServicesModule {
}
