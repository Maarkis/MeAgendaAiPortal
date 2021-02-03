import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {CompanyProfileComponent} from './components/profile/company-profile/company-profile.component';
import {EmployeeProfileComponent} from './components/profile/employee-profile/employee-profile.component';
import {EmployeeProfilePublicComponent} from './components/employee-profile-public/employee-profile-public.component';
import {CompanyProfilePublicComponent} from './components/company-profile-public/company-profile-public.component';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
    declarations: [
        ProfileComponent,
        CompanyProfileComponent,
        EmployeeProfileComponent,
        EmployeeProfilePublicComponent,
        CompanyProfilePublicComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ]
})
export class ProfileModule {
}
