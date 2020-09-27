import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AgendarComponent} from './modules/agendamento/components/agendar/agendar.component';
import {MainMenuComponent} from './modules/shared/components/main-menu/main-menu.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './modules/shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home', component: MainMenuComponent, children: [
            {path: '', component: AgendarComponent}
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
