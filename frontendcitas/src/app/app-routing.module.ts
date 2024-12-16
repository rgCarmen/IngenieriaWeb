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
import { NotificationsComponent } from './notifications/notifications.component';
import { InfoComponent } from './clinical-history/info/info.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';



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
    path: 'clinical-history',
    component: ClinicalHistoryComponent,
    canActivate: [AuthGuard], 
    data: { role: 'MEDICO' }, 
    children: [
      {
        path: 'patient-info/:id',
        component: InfoComponent,
        canActivate: [AuthGuard],
        data: { role: 'MEDICO' }
      }
    ]
  },

  // Ruta para estadisticas, protegida por RoleGuard (solo admins)
  {
    path: 'stadistics',
    component: StadisticsComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMINISTRADOR' }, // Solo accesible para administradores
  },

  // Ruta para el Panel Administrativo
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMINISTRADOR' }, // Protegida para ADMINISTRADOR
  },

  // Ruta para agenda de médicos
  {
    path: 'agenda',
    component: AgendaMedicoComponent,
    canActivate: [AuthGuard],
    data: { role: 'MEDICO' }
  },
  // Ruta para el login
  { path: 'login', component: LoginComponent },

  // Registro de usuario
  { path: 'registro', component: RegistroComponent},

  // Ruta para accesos no autorizados
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Redirecciones
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/home' }, // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
