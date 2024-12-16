package com.aplicacion.backendcitas.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.model.CitaService;
import com.aplicacion.backendcitas.model.PacienteRepository;
import com.aplicacion.backendcitas.model.notificacionRepository;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Medico;
import com.aplicacion.backendcitas.model.entidades.Notificaciones;
import com.aplicacion.backendcitas.model.entidades.Paciente;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;

@RestController
// Lo del rol se puede poner con @PreAutorize
@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    private CitaService citaService;
    
    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private notificacionRepository notificacionRepository;

    // Ver sus citas Agendadas
    @GetMapping("/{usuarioId}/citas")
    public List<Cita> obtenerCitas(@PathVariable Long usuarioId) {
        List<Cita> citas = citaService.obtenerCitasPorPaciente(usuarioId);
        System.out.println(citas);
        return citas;
    }

    @GetMapping("/pacientes/usuario-id")
    public ResponseEntity<Long> obtenerUsuarioIdPorNombre(@RequestParam String nombre, @RequestParam String apellidos) {
        Paciente paciente = pacienteRepository.findByNombreAndApellidos(nombre, apellidos);
        if (paciente != null) {
            return ResponseEntity.ok(paciente.getUsuario().getId());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Ver citas libres????

    // Pedir cita (buscar cita libre con las características que desea y asignarle
    // el paciente)
    // ? no funciona y no se por qué

    @PutMapping("/{usuarioId}/citas/pedir/{id}")
    public ResponseEntity<?> pedirCita(@PathVariable Long usuarioId, @PathVariable Long id) {
        try {
            // Obtener la cita existente
            Cita citaExistente = citaService.obtenerCitaPorId(id);
    
            // Verificar si la cita ya está ocupada
            if (citaExistente.getPaciente() != null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("La cita ya está ocupada.");
            }
    
            // Buscar el paciente por su usuarioId
            Paciente paciente = pacienteRepository.findByUsuarioId(usuarioId);
    
            // Verificar si la cita es una cita pasada
            if (citaExistente.getFecha().isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede reservar una cita pasada.");
            }
    
            // Asignar el paciente a la cita
            citaExistente.setPaciente(paciente);
    
            // Actualizar la cita en la base de datos
            Cita citaAsignada = citaService.actualizarCita(id, citaExistente);
    
            // Obtener el nombre completo del médico
            Medico medico = citaExistente.getMedico(); // Relación directa con la tabla Medico
            String nombreCompletoMedico = String.format("%s %s", medico.getNombre(), medico.getApellidos());
    
            // Crear una notificación para el paciente
            String mensajePaciente = String.format(
                "Tu cita médica ha sido programada para el %s a las %s con el Dr./Dra. %s.",
                citaExistente.getFecha().toLocalDate(),
                citaExistente.getFecha().toLocalTime(),
                nombreCompletoMedico
            );
    
            Notificaciones notificacionPaciente = new Notificaciones(
                paciente.getUsuario(),
                mensajePaciente,
                LocalDateTime.now() // Fecha actual como fecha de envío
            );
    
            // Crear una notificación para el médico
            String mensajeMedico = String.format(
                "Se ha programado una nueva cita para el %s a las %s con el paciente %s %s.",
                citaExistente.getFecha().toLocalDate(),
                citaExistente.getFecha().toLocalTime(),
                paciente.getNombre(),
                paciente.getApellidos()
            );
    
            Notificaciones notificacionMedico = new Notificaciones(
                medico.getUsuario(),
                mensajeMedico,
                LocalDateTime.now() // Fecha actual como fecha de envío
            );
    
            // Guardar las notificaciones en la base de datos
            notificacionRepository.save(notificacionPaciente);
            notificacionRepository.save(notificacionMedico);
    
            // Devolver la cita asignada como respuesta
            return new ResponseEntity<>(citaAsignada, HttpStatus.OK);
    
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la cita o el paciente.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }
    
    // Cancelar cita
    @PutMapping("/{usuarioId}/citas/cancelar/{id}")
    public ResponseEntity<Void> cancelarCita(@PathVariable Long usuarioId, @PathVariable Long id) {
        try {
            Cita cita = citaService.obtenerCitaPorId(id);
            if (cita.getPaciente().getUsuario().getId() != usuarioId) { // comprobar que sea una cita de ese paciente
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            if (cita.getFecha().isBefore(LocalDateTime.now())) { // que no sea una cita pasada
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            citaService.cancelarCita(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 si la cita no existe
        }
    }

}
