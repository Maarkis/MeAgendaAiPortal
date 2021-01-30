import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EsqueceuSenhaComponent} from './components/esqueceu-senha/esqueceu-senha.component';
import {MatCardModule} from '@angular/material/card';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {ResetSenhaComponent} from './components/reset-senha/reset-senha.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {RegisterCompanyComponent} from './components/register-company/register-company.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
    declarations: [
        LoginComponent,
        EsqueceuSenhaComponent,
        CadastroComponent,
        ResetSenhaComponent,
        RegisterUserComponent,
        RegisterCompanyComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        Ng2TelInputModule,
        TextMaskModule
    ]
})
export class LoginModule {
}
