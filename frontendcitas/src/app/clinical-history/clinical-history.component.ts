import { Component, OnInit } from '@angular/core';
import { ClinicalHistoryService } from '../clinical-history.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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

  constructor(private clinicalHistoryService: ClinicalHistoryService, private router: Router, private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    // Cargar pacientes
    this.clinicalHistoryService.getPatients().subscribe(
      (data) => {
        this.patients = data;
        console.log(this.patients);
        
        this.filterPatients(); // Inicializamos el filtro con todos los pacientes
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  
    // Detectar cambios en la ruta para ocultar/mostrar la tabla
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showPatientTable = !this.router.url.includes('/clinical-history/patient-info');
    });
  }
  

  filterPatients(): void {
    this.filteredPatients = this.patients.filter((patient) =>
      patient.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewPatientHistory(patient: any): void {
    console.log(patient.id);
    this.router.navigate(['patient-info', patient.id], { relativeTo: this.route });
  }  

  goBack(): void {
    this.showPatientTable = false;
    this.selectedPatient = null;
  }
}
