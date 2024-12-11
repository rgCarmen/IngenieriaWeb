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
// import { RoleGuard } from './role.guard';
import { ClinicalHistoryComponent } from './clinical-history/clinical-history.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component'; // Importar el componente de acceso no autorizado

const routes: Routes = [
  // Página principal
  { path: '', component: HomeComponent },

  // Rutas para citas, protegidas por AuthGuard
  {
    path: 'citas',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
    data: { role: 'PACIENTE' },
    children: [
      { 
        path: 'create', 
        component: CreateAppointmentComponent, 
        canActivate: [AuthGuard],
        data: { role: 'PACIENTE' } 
      },
      
      { 
        path: 'modify', 
        component: ModifyAppointmentComponent, 
        canActivate: [AuthGuard],
        data: { role: 'PACIENTE' } 
      },
      // { path: 'cancel', component: CancelAppointmentComponent },
    ],
  },

  // Ruta para la cuenta del usuario, protegida por AuthGuard y RoleGuard
  {
    path: 'mi-cuenta',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },

  // Ruta para el historial clínico, protegida por RoleGuard (solo doctores)
  {
    path: 'historial',
    component: ClinicalHistoryComponent,
    canActivate: [AuthGuard],
    data: { role: 'MEDICO' }, // Solo accesible para médicos
  },

  // Ruta para el login
  { path: 'login', component: LoginComponent },

  // Ruta para accesos no autorizados
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Redirección por defecto
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
