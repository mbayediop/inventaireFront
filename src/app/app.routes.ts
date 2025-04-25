import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SitesComponent } from './components/sites/sites.component';
import { EquipementsComponent } from './components/equipements/equipements.component';
import { ConsommablesComponent } from './components/consommables/consommables.component';
import { ModopComponent } from './components/modop/modop.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    //{ path: '**', redirectTo: '' },
     //  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
   // { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },

 //  { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'sites', component: SitesComponent},
    { path: 'equipements', component: EquipementsComponent },
    { path: 'consommables', component: ConsommablesComponent},
    { path: 'modop', component: ModopComponent},
    { path: '**', redirectTo: '' },
];
