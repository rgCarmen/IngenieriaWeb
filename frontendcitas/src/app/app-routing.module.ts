import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Inicio
  { path: 'citas', component: AppointmentsComponent, canActivate: [AuthGuard] }, // Citas protegidas
  { path: 'mi-cuenta', component: AccountComponent, canActivate: [AuthGuard] }, // Mi cuenta protegida
  { path: 'login', component: LoginComponent }, // Login
  { path: '**', redirectTo: '' } // Redirigir a Inicio si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
