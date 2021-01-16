import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AgendarComponent} from './modules/agendamento/components/agendar/agendar.component';
import {MainMenuComponent} from './modules/shared/components/main-menu/main-menu.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './modules/shared/components/page-not-found/page-not-found.component';
import {LoginComponent} from './modules/login/components/login/login.component';
import {AuthGuardGuard} from './modules/shared/guards/auth-guard.guard';
import {HomeComponent} from './modules/home/components/home/home.component';
import {MeusAgendamentosComponent} from './modules/meus-agendamentos/components/meus-agendamentos/meus-agendamentos.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'perfil', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: AgendarComponent}
        ]
    },
    {
        path: 'meus-agendamentos', component: MainMenuComponent, canActivate: [AuthGuardGuard], children: [
            {path: '', component: MeusAgendamentosComponent}
        ]
    },
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
