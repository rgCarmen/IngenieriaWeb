import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
//import { HistoryComponent } from './history/history.component';
//import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'citas', component: AppointmentsComponent, canActivate: [RoleGuard], data: { role: 'paciente' } },
  { path: 'mi-cuenta', component: AccountComponent, canActivate: [RoleGuard], data: { role: 'paciente' } },
  //{ path: 'historial', component: HistoryComponent, canActivate: [RoleGuard], data: { role: 'medico' } },
  //{ path: 'estadisticas', component: StatisticsComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
