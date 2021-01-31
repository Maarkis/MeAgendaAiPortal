import {Component, OnInit} from '@angular/core';
import {UserAuthenticated} from '../../../shared/models/authentication/authentication.class';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../../shared/services/session.service';
import {UserService} from '../../../shared/services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private userAuthentication: UserAuthenticated;

    private uid: string;

    constructor(private dialog: MatDialog, private sessionService: SessionService,
                private userService: UserService, private sanitizer: DomSanitizer, private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.userAuthentication = this.sessionService.userAuthenticated;
        if (this.userAuthentication) {
            this.router.navigate(['perfil-privado'], {queryParams: {uid: this.uid}});
        } else {
            // this.userService.clientVerified(this.userAuthentication.id).subscribe((response: ResponseBase<{ userVerified: boolean }>) => {
            //     if (response.success) {
            //         if (!response.result.userVerified) {
            //             this.dialog.open(ModalEmailConfirmationComponent, {
            //                 id: 'email-confirmation-modal', panelClass: 'custom-modal',
            //                 width: '500px', height: 'auto', disableClose: true, data: {
            //                     id: this.userAuthentication.id,
            //                     email: this.userAuthentication.userEmail,
            //                     nextRoute: ''
            //                 }
            //             });
            //         }
            //     }
            // });
        }
    }


}
