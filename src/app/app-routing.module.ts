import {NgModule} from '@angular/core';
import {MainMenuComponent} from './modules/shared/components/main-menu/main-menu.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './modules/shared/components/page-not-found/page-not-found.component';
import {LoginComponent} from './modules/login/components/login/login.component';
import {AuthGuardGuard} from './modules/shared/guards/auth-guard.guard';
import {HomeComponent} from './modules/home/components/home/home.component';
import {EsqueceuSenhaComponent} from './modules/login/components/esqueceu-senha/esqueceu-senha.component';
import {ResetSenhaComponent} from './modules/login/components/reset-senha/reset-senha.component';
import {ConfirmarEmailComponent} from './modules/shared/components/confirmar-email/confirmar-email.component';
import {ProfileComponent} from './modules/profile/components/profile/profile.component';
import {AppointmentsComponent} from './modules/appointments/components/appointments/appointments.component';
import {AccountComponent} from './modules/account/components/account/account.component';
import {RegisterCompanyComponent} from './modules/login/components/register-company/register-company.component';
import {RegisterUserComponent} from './modules/login/components/register-user/register-user.component';
import {HistoricComponent} from './modules/historic/components/historic/historic.component';
import {EmployeeComponent} from './modules/employee/components/employee/employee.component';
import {ServicesComponent} from './modules/services/components/services/services.component';
import {CompanyProfilePublicComponent} from './modules/profile/components/company-profile-public/company-profile-public.component';
import {EmployeeProfilePublicComponent} from './modules/profile/components/employee-profile-public/employee-profile-public.component';
import {UserConfirmationComponent} from './modules/shared/components/user-confirmation/user-confirmation.component';
import {ScheduleComponent} from './modules/schedule/components/schedule/schedule.component';
import {AboutComponent} from './modules/shared/components/about/about.component';
import {HelpComponent} from './modules/shared/components/help/help.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register-user', component: RegisterUserComponent},
    {path: 'register-company', component: RegisterCompanyComponent},
    {path: 'esqueceu-senha', component: EsqueceuSenhaComponent},
    {path: 'confirmar-email/:uid', component: ConfirmarEmailComponent},
    {path: 'email-confirmado', component: UserConfirmationComponent},
    {path: 'redefinir-senha/:uid/:token', component: ResetSenhaComponent},
    {
        path: 'perfil/:uid/:role', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: ProfileComponent},
        ]
    },
    {
        path: 'perfil_empresa/:uid', component: CompanyProfilePublicComponent
    },
    {
        path: 'perfil_funcionario/:uid', component: EmployeeProfilePublicComponent
    },
    {
        path: 'conta', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: AccountComponent}
        ]
    },
    {
        path: 'meus-agendamentos', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: AppointmentsComponent}
        ]
    },
    {
        path: 'historico', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: HistoricComponent}
        ]
    },
    {
        path: 'funcionarios', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: EmployeeComponent}
        ]
    },
    {
        path: 'servicos', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: ServicesComponent}
        ]
    },
    {
        path: 'agendar', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: ScheduleComponent}
        ]
    },
    {
        path: 'sobre', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: AboutComponent}
        ]
    },
    // {
    //     path: 'ajuda', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
    //         {path: '', component: HelpComponent}
    //     ]
    // },
    {path: '**', component: PageNotFoundComponent} // Wildcard route for a 404 page
];


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
