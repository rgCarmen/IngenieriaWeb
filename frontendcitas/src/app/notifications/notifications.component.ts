import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications = [
    { message: 'Cita creada con éxito para el 2024-12-05.', date: new Date() },
    { message: 'Tu cita ha sido cancelada.', date: new Date() },
    { message: 'Nueva cita disponible para Cardiología.', date: new Date() },
  ];

  constructor() {}

  ngOnInit(): void {}
}
