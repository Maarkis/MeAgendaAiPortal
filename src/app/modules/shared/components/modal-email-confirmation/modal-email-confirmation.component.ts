import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client/client.service';
import {ResponseBase} from '../../models/response-base';
import {NotificationService} from '../../services/notification/notification-service.service';

@Component({
    selector: 'app-modal-email-confirmation',
    templateUrl: './modal-email-confirmation.component.html',
    styleUrls: ['./modal-email-confirmation.component.css']
})
export class ModalEmailConfirmationComponent implements OnInit {
    private readonly id: string;
    public readonly email: string;
    private nextRoute: string;

    constructor(public dialogRef: MatDialogRef<ModalEmailConfirmationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router,
                private clientService: ClientService,
                private notificationService: NotificationService) {
        if (data.id) {
            this.id = data.id;
        }
        if (data.email) {
            this.email = data.email;
        }
        if (data.nextRoute) {
            this.nextRoute = data.nextRoute;
        }
    }

    ngOnInit(): void {
        console.log(this.id);
        console.log(this.email);
    }

    public resendEmail(email: string): void {
        this.clientService.resendEmail(email).subscribe((response: ResponseBase<string>) => {
            if (response.success) {
                this.notificationService.showMessageSnackBar(response.result);
            }
        }, error => {
            console.log(error.error.result);
        });
    }
}
