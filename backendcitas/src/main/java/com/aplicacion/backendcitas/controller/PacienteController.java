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
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.model.CitaService;
import com.aplicacion.backendcitas.model.PacienteRepository;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Paciente;

import jakarta.persistence.EntityNotFoundException;

@RestController
// Lo del rol se puede poner con @PreAutorize
@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    private CitaService citaService;
    
    @Autowired
    private PacienteRepository pacienteRepository;

    // Ver sus citas Agendadas
    @GetMapping("/{usuarioId}/citas")
    public List<Cita> obtenerCitas(@PathVariable Long usuarioId) {
        List<Cita> citas = citaService.obtenerCitasPorPaciente(usuarioId);
        System.out.println(citas);
        return citas;
    }

    // Ver citas libres????

    // Pedir cita (buscar cita libre con las características que desea y asignarle
    // el paciente)
    // ? no funciona y no se por qué

    @PutMapping("/{usuarioId}/citas/pedir/{id}")
    public ResponseEntity<?> pedirCita(@PathVariable Long usuarioId, @PathVariable Long id) {
        try {
            Cita citaExistente = citaService.obtenerCitaPorId(id);

            // cita esta libre
            if (citaExistente.getPaciente() != null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            Paciente paciente = pacienteRepository.findByUsuarioId(usuarioId);
            // comprobar que no es una cita pasada
            if (citaExistente.getFecha().isBefore(LocalDateTime.now())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            // paciente existe se comprueba en el servicio
            citaExistente.setPaciente(paciente);

            Cita citaAsignada = citaService.actualizarCita(id, citaExistente);
            return new ResponseEntity<>(citaAsignada, HttpStatus.OK);

        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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
