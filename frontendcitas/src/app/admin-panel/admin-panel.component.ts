import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  @ViewChild('updateConfirmDialog') updateConfirmDialog!: TemplateRef<any>;

  constructor(private AdminService: AdminService, private router: Router, private dialog: MatDialog) {}

  // Método que se ejecuta al enviar el formulario
  onSubmit(form: any): void {
    if (form.valid) {
      if (form.value.password !== form.value.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifíquelas.');
        return;
      }

      const doctorData = {
        nombre: form.value.nombre,
        apellidos: form.value.apellidos,
        correo: form.value.correo,
        telefono: form.value.telefono,
        especialidad: form.value.especialidad,
        password: form.value.password // Enviar solo una contraseña
      };

      this.AdminService.registerDoctor(doctorData).subscribe(
        response => {
          console.log('Médico registrado exitosamente:', response);
          this.dialog.open(this.updateConfirmDialog); // Abre el diálogo de confirmación
        },
        error => {
          console.error('Error al registrar el médico:', error);
          alert('Hubo un error al registrar el médico');
        }
      );
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  closeDialog(): void {
    this.dialog.closeAll(); // Cierra todos los diálogos abiertos
    this.router.navigate(['/doctors']); // Redirige después de cerrar el diálogo
  }
}