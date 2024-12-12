import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { ModifyAppointmentComponent } from './appointments/modify-appointment/modify-appointment.component';
import { CancelAppointmentComponent } from './appointments/cancel-appointment/cancel-appointment.component';
import { AuthGuard } from './auth.guard';
import { ClinicalHistoryComponent } from './clinical-history/clinical-history.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {RegistroComponent} from './registro/registro.component';
import { GuidesComponent } from './home/guides/guides.component';
import { SupportComponent } from './home/support/support.component';
import { MedicalServicesComponent } from './home/medical-services/medical-services.component';
import { StadisticsComponent } from './stadistics/stadistics.component';
import { AgendaMedicoComponent } from './agenda-medico/agenda-medico.component';
import { CrearCitaComponent } from './agenda-medico/crear-cita/crear-cita.component';
import { NotificationsComponent } from './notifications/notifications.component';



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

      { 
        path: 'cancel', 
        component: CancelAppointmentComponent, 
        canActivate: [AuthGuard],
        data: { role: 'PACIENTE' } 
      },
    ],
  },

  // Ruta para la cuenta del usuario, protegida por AuthGuard y RoleGuard
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },

  // Ruta para las notificaciones
  {
    path: 'notifications',
    component: NotificationsComponent,
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

  {
    path: 'agenda',
    component: AgendaMedicoComponent,
    canActivate: [AuthGuard],
    data: { role: 'MEDICO' },
    children: [
      { 
        path: 'create', 
        component: CrearCitaComponent , 
        canActivate: [AuthGuard],
        data: { role: 'MEDICO' } 
      }
     ] 
  },
  // Ruta para el login
  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent},

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
