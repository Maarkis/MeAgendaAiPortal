import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication';
import {ModalEmailConfirmationComponent} from '../../../shared/components/modal-email-confirmation/modal-email-confirmation.component';
import {ClientService} from '../../../shared/services/client/client.service';
import {ResponseBase} from '../../../shared/models/response-base';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    private userAuthentication: UserAuthenticated;

    constructor(private dialog: MatDialog, private sessionService: SessionService,
                private clientService: ClientService) {
    }

    ngOnInit(): void {
        this.userAuthentication = this.sessionService.userAuthenticated;

        this.clientService.clientVerified(this.userAuthentication.id).subscribe((response: ResponseBase<{ userVerified: boolean }>) => {
            if (response.success) {
                if (!response.result.userVerified) {
                    this.dialog.open(ModalEmailConfirmationComponent, {
                        id: 'email-confirmation-modal', panelClass: 'custom-modal',
                        width: '500px', height: 'auto', disableClose: true, data: {
                            id: this.userAuthentication.id,
                            email: this.userAuthentication.userEmail,
                            nextRoute: ''
                        }
                    });
                }
            }
        });
    }

}
