package com.aplicacion.backendcitas.controller;

import com.aplicacion.backendcitas.model.CitaService;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Paciente;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CitaController {

    // Un controlador más general para ver citas, pero no realizar muchas modificaciones en ellas. Quizás adecuado para el ADMINISTRADOR

    @Autowired
    private CitaService citaService;

    @GetMapping("/citas")
    public List<Cita> obtenerCitas() {
        return citaService.obtenerTodasLasCitas();
    }

    @GetMapping("/medicos/{medicoId}/citas-disponibles")
    public ResponseEntity<List<Cita>> obtenerCitasDisponiblesPorMedico(@PathVariable Long medicoId) {
        List<Cita> citasDisponibles = citaService.obtenerCitasPorMedico(medicoId);
        return new ResponseEntity<>(citasDisponibles, HttpStatus.OK);
    }

    @GetMapping("/citas/{id}")
    public ResponseEntity<Cita> obtenerCitaPorId(@PathVariable Long id) {
        return new ResponseEntity<>(citaService.obtenerCitaPorId(id), HttpStatus.OK);
    }

    @PostMapping(value = "/citas", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> crearCita(@Valid @RequestBody Cita cita) {
        cita.setPaciente(null); // Asegura que la cita se crea sin paciente asignado
        Cita nuevaCita = citaService.crearCita(cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }

    @PutMapping("/citas/reservar/{id}")
    public ResponseEntity<?> reservarCita(@PathVariable Long id, @RequestParam Paciente paciente) {
        Cita cita = citaService.obtenerCitaPorId(id);
        if (cita.getPaciente() == null) {
            cita.setPaciente(paciente);
            citaService.actualizarCita(id, cita);
            return new ResponseEntity<>("Cita reservada exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cita ya reservada", HttpStatus.BAD_REQUEST);
        }
    }


    /*
    @PutMapping(value = "/citas/{id}",     consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> actualizarCita(@PathVariable Long id, @Valid @RequestBody Cita cita) {

        Cita citaActualizada = citaService.actualizarCita(id, cita);
        return new ResponseEntity<>(citaActualizada, HttpStatus.OK);
    }
    */

    @DeleteMapping("/citas/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long id) {
        citaService.eliminarCita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
