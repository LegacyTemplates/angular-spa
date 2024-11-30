import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorage } from 'nglib';

import { AuthGuard } from '../../auth-guard';
import { UserService } from '../../services/user.service';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './components/personal/personal.component';
import { PersonalSidenavComponent } from './components/sidenav/personal.sidenav.component';
import { AppMaterialModule } from '../../app-material.module';

@NgModule({
    declarations: [
        PersonalComponent,
        PersonalSidenavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PersonalRoutingModule,
        AppMaterialModule
    ],
    providers: [
        AuthGuard,
        UserService,
        LocalStorage
    ]
})
export class PersonalModule {

}