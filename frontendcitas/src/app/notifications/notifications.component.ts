import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    const usuarioId = 1; // Puedes cambiarlo dinámicamente si es necesario
    this.notificationsService.getNotifications(usuarioId).subscribe(
      (data) => {
        // Ajusta el formato de los datos recibidos para incluir el mensaje correctamente
        this.notifications = data.map((item: any) => ({
          message: item.mensaje, // Accede a la propiedad 'mensaje' del objeto
          date: new Date(),      // Puedes asignar una fecha si no viene en los datos
        }));
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
}