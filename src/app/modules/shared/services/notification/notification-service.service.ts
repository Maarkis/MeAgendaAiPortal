import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../../components/modal/modal.component';
import {DeviceService} from '../device/device.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private deviceService: DeviceService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    }

    public showMessageSnackBar(message: string, error: boolean = false, duration: number = 5000): void {
        // The second parameter is the text in the button.
        // In the third, we send in the css class for the snack bar.
        if (error) {
            this.snackBar.open(message, 'X', {panelClass: ['error'], duration});

        } else {
            this.snackBar.open(message, 'X', {panelClass: ['success'], duration});
        }
    }

    public showMessageMatDialog(title: string,
                                text: string,
                                height: string = 'auto',
                                width: string = 'auto',
                                disableClose: boolean = false): void {
        const dialodRef = this.dialog.open(ModalComponent, {
            panelClass: 'custom-modal', backdropClass: '', height, width, disableClose,
            data: {
                title, text,
                button: 'OK', route: ''
            }
        });
    }
}
