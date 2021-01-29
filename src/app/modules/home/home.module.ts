import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NavBarHomeComponent} from './components/home/nav-bar-home/nav-bar-home.component';
import {ModalLoginComponent} from './components/modal/modal-login/modal-login.component';
import {ModalRegisterComponent} from './components/modal/modal-register/modal-register.component';

@NgModule({
    declarations: [
        HomeComponent,
        NavBarHomeComponent,
        ModalLoginComponent,
        ModalRegisterComponent
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        ModalLoginComponent,
        ModalRegisterComponent
    ]
})
export class HomeModule {
}
