import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { ModifyAppointmentComponent } from './appointments/modify-appointment/modify-appointment.component';
//import { CancelAppointmentComponent } from './appointments/cancel-appointment/cancel-appointment.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
//import { HistoryComponent } from './history/history.component';
//import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'citas', 
    component: AppointmentsComponent, 
    canActivate: [AuthGuard], // Protege el acceso a citas
    children: [
      { path: 'create', component: CreateAppointmentComponent },
      { path: 'modify', component: ModifyAppointmentComponent },
    ] 
  },
  { 
    path: 'mi-cuenta', 
    component: AccountComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'paciente' } // Solo accesible para pacientes
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige a home si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
