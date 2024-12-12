import { Component } from '@angular/core';

@Component({
  selector: 'app-stadistics',
  standalone: false,
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.css'
})
export class StadisticsComponent {
  fullscreenImage: string | null = null;

  // Función para abrir la imagen en pantalla completa
  openFullscreen(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target && target.src) {
      this.fullscreenImage = target.src;
    }
  }

  // Función para cerrar el modo de pantalla completa
  closeFullscreen(): void {
    this.fullscreenImage = null;
  }

}
