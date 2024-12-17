# Gestión de Citas - Proyecto de Ingeniería Web

Este proyecto es una aplicación para la **gestión de citas médicas** desarrollada con **Spring Boot** para el backend y **Angular** para el frontend. Permite a los pacientes gestionar sus citas y a los médicos gestionar su disponibilidad y ver sus citas. 

## Características Principales

- **Registro de pacientes**: Los pacientes pueden registrarse en la plataforma y gestionar sus citas médicas.
- **Gestión de médicos**: Los médicos pueden actualizar su disponibilidad y ver sus citas programadas.
- **Asignación de citas**: Los pacientes pueden ver las fechas y horas disponibles para agendar citas con los médicos.
- **Notificaciones**: La aplicación incluye un sistema de notificaciones para informar a los usuarios sobre la confirmación, modificación o cancelación de citas.
- **Panel de administración**: Los administradores podrán registrar nuevos médicos.

## Cómo Ejecutar la Aplicación

### Backend - Spring Boot

1. Clona el repositorio y ve a backendcitas:
  ```bash
  git clone https://github.com/rgCarmen/IngenieriaWeb.git
  cd backendcitas
  ```
2. Inicia el servidor backend
  ```bash
  mvn spring-boot:run
  ```
### Frontend - Angular
1. Instalar las dependencias del proyecto
 ```bash
 cd frontendcitas
 npm install
 ```
2. Inicia el servidor de desarrollo
  ```bash
  ng serve
  ```
3. Abre tu navegador y accede a http://localhost:4200.

---
### Usuarios de Ejemplo
| **Rol**        | **Email**                 | **Contraseña**  |
|----------------|---------------------------|-----------------|
| **Paciente**   | paciente@example.com       | paciente        |
| **Administrador** | admin@example.com         | admin           |
| **Médico**     | medico@example.com         | medico          |
