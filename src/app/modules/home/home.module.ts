import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NavBarHomeComponent} from './components/home/nav-bar-home/nav-bar-home.component';
import {ModalLoginComponent} from './components/modal/modal-login/modal-login.component';

@NgModule({
    declarations: [
        HomeComponent,
        NavBarHomeComponent,
        ModalLoginComponent
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        ModalLoginComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
