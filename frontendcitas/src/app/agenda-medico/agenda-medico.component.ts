import { Component, OnInit, TemplateRef } from '@angular/core';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agenda-medico',
  standalone: false,
  
  templateUrl: './agenda-medico.component.html',
  styleUrl: './agenda-medico.component.scss'
})
export class AgendaMedicoComponent implements OnInit{


  citasFuturas: any[] = [];
  citasPasadas: any[] = [];
  selectedCitaId: number | null =null;
  citaEliminada: boolean=false;

  constructor(private dialog: MatDialog, private citasService: CitasService, private router: Router) {}

  ngOnInit(): void {
    this.citasMedico();
  }
  citasMedico() {
    this.citasService.citasMedico().subscribe({
      next: (data) => {
        const now = new Date();
        console.log(data); // Imprime la respuesta en la consola
        const citas = data.map((cita: any) => ({
          fecha: new Date(cita.fecha),
          paciente:  `${cita.paciente.nombre} ${cita.paciente.apellidos}`,
          tipo: cita.tipoCita,
          id: cita.id
        }));

        this.citasFuturas = citas.filter((cita: any) => cita.fecha >= now);
        this.citasPasadas = citas.filter((cita: any) => cita.fecha < now);
      },
      error: (err) => {
        console.error('Error al obtener las citas:', err);
      }
    });
  }


  openDialog(dialogTemplate: TemplateRef<any>,  citaId: number): void {
    this.selectedCitaId = citaId;
    this.dialog.open(dialogTemplate, {
      width: '300px',
    });
  }

  cancelarDialogo(): void {
    this.dialog.closeAll();
  }


  cancelarCita() {
    
    if(this.selectedCitaId){
      this.citasService.eliminarCita(this.selectedCitaId).subscribe({
        next: () => {
          this.citasFuturas = this.citasFuturas.filter((cita: any) => cita.id !== Number(this.selectedCitaId));
          console.log(this.selectedCitaId);
          console.log(this.citasFuturas.filter((cita: any) => cita.id !== this.selectedCitaId));
          this.citaEliminada = true;
          setTimeout(() => {
            this.citaEliminada = false; 
          }, 3000); // se quita el mensaje en 3 seg
          this.selectedCitaId = null;
        },
        error: (err) => {
          console.error('Error al eliminar la cita:', err);
          alert('No se pudo eliminar la cita.');
        }
      });

    }
  
    this.dialog.closeAll();
    
  }


  navigateTo(action: string) {
    this.router.navigate([`/agenda/${action}`]);
  }
  
}
