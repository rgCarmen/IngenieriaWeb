import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PacienteComponent } from './paciente/paciente.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a /login por defecto
  { path: '**', redirectTo: '/login' }, // Ruta de seguridad para URLs no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
