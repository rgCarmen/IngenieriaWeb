import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalHistoryService } from '../../clinical-history.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  appointments: any[] = [];
  patientName: string = '';
  selectedPatient: any;

  @ViewChild('updateConfirmDialog') updateConfirmDialog!: TemplateRef<any>;

  constructor(
    private clinicalHistoryService: ClinicalHistoryService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.params['id'];
    this.patientName = this.route.snapshot.params['nombre'];

    this.clinicalHistoryService.getPatientAppointments(pacienteId).subscribe(
      (data) => {
        
        this.appointments = data.sort((a:any, b:any) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });
      
      },
      (error) => {
        console.error('Error al obtener las citas del paciente:', error);
      }
    );
  }

  viewReport(appointment: any) {
    this.dialog.open(this.updateConfirmDialog, {
      width: '400px',
      data: appointment // Pasar datos al diálogo
    });
  }

  goBack() {
    this.router.navigate(['/clinical-history']);
  }
}

