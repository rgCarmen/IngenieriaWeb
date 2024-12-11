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
import { MedicalServicesComponent } from './home/medical-services/medical-services.component';
import { GuidesComponent } from './home/guides/guides.component';
import { SupportComponent } from './home/support/support.component';
import { StadisticsComponent } from './stadistics/stadistics.component';

const routes: Routes = [
  // Página principal
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'medical-services', component: MedicalServicesComponent },
      { path: 'guides', component: GuidesComponent },
      { path: 'support', component: SupportComponent },
    ],
  },

  // Rutas para citas, protegidas por AuthGuard
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
    data: { role: 'PACIENTE'},
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
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },

  // Ruta para el historial clínico, protegida por RoleGuard (solo doctores)
  {
    path: 'history',
    component: ClinicalHistoryComponent,
    canActivate: [AuthGuard],
    data: { role: 'MEDICO' }, // Solo accesible para médicos
  },

  // Ruta para estadisticas, protegida por RoleGuard (solo admins)
  {
    path: 'stadistics',
    component: StadisticsComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMINISTRADOR' }, // Solo accesible para administradores
  },

  // Ruta para el login
  { path: 'login', component: LoginComponent },

  // Ruta para accesos no autorizados
  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/home' }, // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
