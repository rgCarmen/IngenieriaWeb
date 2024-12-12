import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { ModifyAppointmentComponent } from './appointments/modify-appointment/modify-appointment.component';
import { CancelAppointmentComponent } from './appointments/cancel-appointment/cancel-appointment.component';
import { ClinicalHistoryComponent } from './clinical-history/clinical-history.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { RegistroComponent } from './registro/registro.component';

import { MedicalServicesComponent } from './home/medical-services/medical-services.component';
import { GuidesComponent } from './home/guides/guides.component';
import { SupportComponent } from './home/support/support.component';
import { StadisticsComponent } from './stadistics/stadistics.component';
import { AgendaMedicoComponent } from './agenda-medico/agenda-medico.component';
import { CrearCitaComponent } from './agenda-medico/crear-cita/crear-cita.component';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppointmentsComponent,
    AccountComponent,
    LoginComponent,
    HeaderComponent,
    CreateAppointmentComponent,
    ModifyAppointmentComponent,
    CancelAppointmentComponent,
    ClinicalHistoryComponent,
    UnauthorizedComponent,
    RegistroComponent,
    MedicalServicesComponent,
    GuidesComponent,
    SupportComponent,
    StadisticsComponent,
    SupportComponent,
    AgendaMedicoComponent,
    CrearCitaComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
