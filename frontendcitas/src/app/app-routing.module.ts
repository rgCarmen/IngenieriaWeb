import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
//import { ModifyAppointmentComponent } from './appointments/modify-appointment/modify-appointment.component';
//import { CancelAppointmentComponent } from './appointments/cancel-appointment/cancel-appointment.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
//import { HistoryComponent } from './history/history.component';
//import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'citas', component: AppointmentsComponent, children: [
    { path: 'create', component: CreateAppointmentComponent },
    //{ path: 'modify', component: ModifyAppointmentComponent },
    //{ path: 'cancel', component: CancelAppointmentComponent },
  ] },
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
