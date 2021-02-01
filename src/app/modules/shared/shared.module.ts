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
import {ModalEmailConfirmationComponent} from './components/modal-email-confirmation/modal-email-confirmation.component';
import {ConfirmarEmailComponent} from './components/confirmar-email/confirmar-email.component';
import {ClosingConfirmationModalComponent} from './components/closing-confirmation-modal/closing-confirmation-modal.component';

@NgModule({
    declarations: [
        MainMenuComponent,
        PageNotFoundComponent,
        ModalComponent,
        UserProfileComponent,
        ModalEmailConfirmationComponent,
        ConfirmarEmailComponent,
        ClosingConfirmationModalComponent

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
