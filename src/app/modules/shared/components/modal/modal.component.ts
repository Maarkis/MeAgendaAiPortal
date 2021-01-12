import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    public title: string;
    public text: string;
    public button = 'Ok';
    public route: string;

    constructor(public dialogRef: MatDialogRef<ModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router) {
        this.title = this.data.title;
        this.text = this.data.text;
        this.button = this.data.button;
        if (this.data.route) {
            this.route = this.data.route;
        }
    }

    ngOnInit() {
    }

    public closeX(): void {
        this.dialogRef.close();
    }

    public close(): void {
        this.dialogRef.close();
        if (this.route) {
            this.router.navigate([this.route]);
        }
    }

}
