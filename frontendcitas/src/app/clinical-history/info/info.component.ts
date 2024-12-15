import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  selectedPatient: any;
  patientAppointments = [
    { date: '2023-12-01', specialty: 'Cardiología', diagnosis: 'Gripe', details: 'Informe detallado sobre gripe' },
    { date: '2023-11-15', specialty: 'Medicina General', diagnosis: 'Hipertensión', details: 'Informe detallado sobre hipertensión' }
  ];
  selectedReport: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    const patientName = this.route.snapshot.paramMap.get('name');
    this.selectedPatient = { name: patientName };
  }

  viewReport(appointment: any) {
    this.selectedReport = appointment;
  }

  closeReport() {
    this.selectedReport = null;
  }

  goBack() {
    this.router.navigate(['/clinical-history']);
  }
}
