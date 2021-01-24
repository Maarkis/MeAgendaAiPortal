import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client/client.service';
import {ResponseBase} from '../../models/response-base';

@Component({
    selector: 'app-confirmar-email',
    templateUrl: './confirmar-email.component.html',
    styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent implements OnInit {
    private uui: string;

    constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) {
    }

    ngOnInit(): void {
        this.uui = this.route.snapshot.paramMap.get('uid');
        this.clientService.confirmationEmail(this.uui).subscribe((response: ResponseBase<string>) => {
            if (response.success) {
                console.log(response.result);
                this.router.navigate(['perfil']);
            } else {
                console.log(response.result);
                this.router.navigate(['']);
            }
        }, error => {
            console.log(error.error.result);
        });
    }

}
