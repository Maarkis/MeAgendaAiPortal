import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';

const routes: Routes = [

];
@NgModule({
    declarations: [
        MainMenuComponent,
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule {
}
