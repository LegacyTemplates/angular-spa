import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../auth-guard';
import { PersonalComponent } from './components/personal/personal.component';
import { PersonalSidenavComponent } from './components/sidenav/personal.sidenav.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: PersonalSidenavComponent,
                outlet: 'nav',
                canActivate: [AuthGuard]
            },
            { path: '', component: PersonalComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule {

}