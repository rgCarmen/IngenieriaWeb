import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core'; // Import necesario
import { FormsModule } from '@angular/forms'; // Importa FormsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    importProvidersFrom(FormsModule), // Asegúrate de usar `importProvidersFrom`
  ],
};
