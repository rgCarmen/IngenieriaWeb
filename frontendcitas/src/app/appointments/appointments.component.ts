import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  constructor(private router: Router) {}

  navigateTo(action: string) {
    this.router.navigate(['/citas', action]);
  }
}
