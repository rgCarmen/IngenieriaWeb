import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { ModifyAppointmentComponent } from './appointments/modify-appointment/modify-appointment.component';
// import { CancelAppointmentComponent } from './appointments/cancel-appointment/cancel-appointment.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { ClinicalHistoryComponent } from './clinical-history/clinical-history.component';
// import { HistoryComponent } from './history/history.component';
// import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  // Página principal
  { path: '', component: HomeComponent },

  // Rutas para citas, protegidas por AuthGuard
  {
    path: 'citas',
    component: AppointmentsComponent,
    canActivate: [AuthGuard], // Solo usuarios autenticados pueden acceder
    children: [
      { path: 'create', component: CreateAppointmentComponent },
      { path: 'modify', component: ModifyAppointmentComponent },
      // { path: 'cancel', component: CancelAppointmentComponent },
    ],
  },

  // Ruta para la cuenta del usuario, protegida por AuthGuard y RoleGuard
  {
    path: 'mi-cuenta',
    component: AccountComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'paciente' }, // Solo accesible para pacientes
  },

  // Ruta para el historial clínico, protegida por RoleGuard (solo doctores)
  {
    path: 'historial',
    component: ClinicalHistoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'medico' }, // Solo accesible para médicos
  },

  // Ruta para el login
  { path: 'login', component: LoginComponent },

  // Redirección por defecto
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
