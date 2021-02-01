import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    selector: 'app-closing-confirmation-modal',
    templateUrl: './closing-confirmation-modal.component.html',
    styleUrls: ['./closing-confirmation-modal.component.css']
})
export class ClosingConfirmationModalComponent implements OnInit {


    public closedModal: boolean;

    constructor(public dialogRef: MatDialogRef<ClosingConfirmationModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router) {
    }

    ngOnInit() {
    }

    public close(confirmClose: boolean): void {
        this.dialogRef.close(confirmClose);
    }

}
