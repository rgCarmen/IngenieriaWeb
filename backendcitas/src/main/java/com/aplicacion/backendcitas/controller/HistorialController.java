package com.aplicacion.backendcitas.controller;

import com.aplicacion.backendcitas.model.CitaService;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/historial")
public class HistorialController {

    @Autowired
    private CitaService citaService;

    // Endpoint para obtener todos los pacientes con citas
    @GetMapping("/pacientes")
    public ResponseEntity<List<Paciente>> obtenerPacientesConCitas() {
        List<Paciente> pacientes = citaService.obtenerPacientesConCitas();
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }

    @GetMapping("/{pacienteId}")
    public ResponseEntity<List<Cita>> obtenerCitasPorPaciente(@PathVariable Long pacienteId) {
        List<Cita> citas = citaService.obtenerCitasPorPaciente(pacienteId);
        if (citas.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(citas, HttpStatus.OK);
    }

}

