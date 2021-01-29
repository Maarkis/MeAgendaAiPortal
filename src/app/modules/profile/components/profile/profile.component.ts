import {Component, OnInit} from '@angular/core';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';
import {UserService} from '../../../shared/services/user/user.service';
import {ResponseBase} from '../../../shared/models/response-base';
import {ModalEmailConfirmationComponent} from '../../../shared/components/modal-email-confirmation/modal-email-confirmation.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private userAuthentication: UserAuthenticated;

    public safeResourceUrl: SafeResourceUrl;
    public src = 'https://media.istockphoto.com/photos/beautiful-young-woman-picture-id1207097533';

    constructor(private dialog: MatDialog, private sessionService: SessionService,
                private userService: UserService, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.userAuthentication = this.sessionService.userAuthenticated;

        this.userService.clientVerified(this.userAuthentication.id).subscribe((response: ResponseBase<{ userVerified: boolean }>) => {

            this.safeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
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
