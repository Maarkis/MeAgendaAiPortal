import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GenericValidator} from '../../../shared/validators/validator-form/generic-validator.validator';

@Component({
    selector: 'app-reset-senha',
    templateUrl: './reset-senha.component.html',
    styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {
    private userId: string;
    public formResetPassword: FormGroup;

    public eyeHide = true;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id');
        console.log(this.userId);

        this.formResetPassword = this.createForm();
    }

    private createForm(): FormGroup {
        return this.fb.group({
            senha: new FormControl('', [Validators.required]),
            confirmarSenha: new FormControl('',
                [Validators.required, GenericValidator.mustMatch('confirmar')])
        });
    }


    public onSubmit(resetSenha: { senha: string, confirmarSenha: string }): void {
        console.log(resetSenha);

    }

    public goBack(): void {
        this.router.navigate(['']);
    }
}
