import { Component, OnInit } from '@angular/core';
import { ClinicalHistoryService } from '../clinical-history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinical-history',
  standalone: false,
  templateUrl: './clinical-history.component.html',
  styleUrls: ['./clinical-history.component.css']
})
export class ClinicalHistoryComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm: string = '';
  showPatientTable: boolean = false;
  selectedPatient: any = null;

  constructor(private clinicalHistoryService: ClinicalHistoryService, private router: Router) {}

  
  ngOnInit(): void {
    this.clinicalHistoryService.getPatients().subscribe(
      (data) => {
        this.patients = data;
        this.filteredPatients = data; // Inicializamos el filtro con todos los pacientes
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }  

  filterPatients(): void {
    this.filteredPatients = this.patients.filter((patient) =>
      patient.NOMBRE.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewPatientHistory(patient: any): void {
    this.clinicalHistoryService.getUsuarioIdByNombre(patient.NOMBRE, patient.APELLIDOS).subscribe(
      (usuarioId) => {
        this.router.navigate(['/historial', usuarioId]);
      },
      (error) => {
        console.error('Error al obtener el usuarioId:', error);
      }
    );
  }

  goBack(): void {
    this.showPatientTable = false;
    this.selectedPatient = null;
  }
}
