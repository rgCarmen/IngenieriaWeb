import { Component } from '@angular/core';

@Component({
  selector: 'app-clinical-history',
  standalone: false,
  templateUrl: './clinical-history.component.html',
  styleUrls: ['./clinical-history.component.css']
})
export class ClinicalHistoryComponent {
  patients = [
    { name: 'Juan Pérez', lastVisit: '2023-12-01' },
    { name: 'María López', lastVisit: '2023-11-15' },
    { name: 'Carlos Martínez', lastVisit: '2023-10-05' },
    { name: 'Ana González', lastVisit: '2023-09-20' }
  ];

  filteredPatients = this.patients;
  searchTerm: string = '';
  showPatientTable: boolean = false;
  selectedPatient: any = null;

  viewPatientHistory(patient: any) {
    this.showPatientTable = true;
    this.selectedPatient = patient;
  }

  goBack() {
    this.showPatientTable = false;
    this.selectedPatient = null;
  }

  filterPatients() {
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
