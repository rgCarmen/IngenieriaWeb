import { Component } from '@angular/core';

@Component({
  selector: 'app-clinical-history',
  standalone: false,
  templateUrl: './clinical-history.component.html',
  styleUrls: ['./clinical-history.component.css'],
})
export class ClinicalHistoryComponent {
  clinicalRecords = [
    { patient: 'Juan Pérez', date: '2023-12-01', diagnosis: 'Gripe', details: 'Detalles del diagnóstico de gripe.' },
    { patient: 'María López', date: '2023-11-15', diagnosis: 'Hipertensión', details: 'Detalles del diagnóstico de hipertensión.' },
  ];

  selectedRecord: any = null;

  viewDetails(record: any) {
    this.selectedRecord = record;
    // Lógica para abrir un modal con detalles
    alert(`Detalles: ${record.details}`);
  }
}
