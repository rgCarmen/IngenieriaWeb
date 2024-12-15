import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  standalone:false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit{

  // Datos personales
  personalData: any={};


  // Preferencias
  preferences = {
    notification: 'email', // Valores posibles: 'email' o 'sms'
  };

  // Historial de actividad (opcional)
  activityHistory: any[] = [];
  showPassword: boolean = false;
  password: any;

  @ViewChild('updateConfirmDialog') updateConfirmDialog!: TemplateRef<any>;

  constructor(private accountService: AccountService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPersonalData();
  }

  loadPersonalData() {
   this.accountService.getUsuario().subscribe(
      (data) => {
        console.log(data);
        this.personalData = data;
        console.log(this.personalData);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  // Métodos para actualizar los datos
  updatePersonalInfo() {
    const { nombre, apellidos, telefono, usuario } = this.personalData;

    this.accountService.updateUsuario(this.personalData, nombre, apellidos, telefono).subscribe(
      (response) => {
        console.log('Datos actualizados correctamente:', response);
        this.openConfirmDialog(this.updateConfirmDialog);
      },
      (error) => {
        console.error('Error al actualizar los datos personales:', error);
        alert('Error al actualizar los datos personales.');
      }
    );
  }

  updatePreferences() {
    alert('Preferencias guardadas: ' + JSON.stringify(this.preferences));
    // Aquí puedes integrar la lógica para guardar las preferencias en el backend.
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Abrir diálogo de confirmación
  openConfirmDialog(template: TemplateRef<any>) {
    this.dialog.open(template, {
      width: '300px'
    });
  }

  // Cerrar diálogo
  closeDialog() {
    this.dialog.closeAll();
  }
}
