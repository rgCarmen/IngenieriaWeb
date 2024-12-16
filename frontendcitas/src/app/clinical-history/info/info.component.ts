import { Component, OnInit } from '@angular/core';
import { ClinicalHistoryComponent } from '../clinical-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalHistoryService } from '../../clinical-history.service';

@Component({
  selector: 'app-patient-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  appointments: any[] = [];
  patientName: string = '';
  selectedReport: any = null;
  selectedPatient: any;

  constructor(
    private clinicalHistoryService: ClinicalHistoryService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.params['id'];
    this.patientName = this.route.snapshot.params['nombre'];
  
    this.clinicalHistoryService
      .getPatientAppointments(pacienteId)
      .subscribe((data) => {
        this.appointments = data;
      });
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
