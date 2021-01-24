import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {ModalComponent} from './components/modal/modal.component';
import {UserProfileComponent} from './components/main-menu/user-profile/user-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        MainMenuComponent,
        PageNotFoundComponent,
        ModalComponent,
        UserProfileComponent
    ],
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        RouterModule,
        CommonModule,
        MatButtonModule,
        MatSnackBarModule

    ]
})
export class SharedModule {
}
