import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {ModalComponent} from './components/modal/modal.component';
import {UserProfileComponent} from './components/main-menu/user-profile/user-profile.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';

const routes: Routes = [];

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
        MatButtonModule

    ]
})
export class SharedModule {
}
