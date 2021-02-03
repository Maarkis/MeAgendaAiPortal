import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseBase} from '../../models/response-base.class';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-confirmar-email',
    templateUrl: './confirmar-email.component.html',
    styleUrls: ['./confirmar-email.component.css']
})
export class ConfirmarEmailComponent implements OnInit {
    private uui: string;

    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.uui = this.route.snapshot.paramMap.get('uid');
        this.userService.confirmationEmail(this.uui).subscribe((response: ResponseBase<string>) => {
            if (response.success) {
                console.log(response.result);
                this.router.navigate(['email-confirmado']);
            } else {
                console.log(response.result);
                this.router.navigate(['']);
            }
        }, error => {
            console.log(error.error.result);
        });
    }

}
