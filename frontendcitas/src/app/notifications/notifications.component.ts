import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService, private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioId = this.authService.getId();

    if (!usuarioId) {
      alert('No se ha encontrado el ID de usuario. Asegúrate de estar autenticado.');
      return;
    }

    this.notificationsService.getNotifications(usuarioId).subscribe(
      (data) => {
        // Ajusta el formato de los datos recibidos para incluir el mensaje correctamente
        this.notifications = data.map((item: any) => ({
          message: item.mensaje, // Accede a la propiedad 'mensaje' del objeto
          date: item.date,      // Puedes asignar una fecha si no viene en los datos
        })).reverse();
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
}