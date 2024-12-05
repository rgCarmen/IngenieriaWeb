package com.aplicacion.backendcitas.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.model.Cita;
import com.aplicacion.backendcitas.model.CitaService;

@RestController
public class CitaController {

    @Autowired
    private CitaService citaService;

    @GetMapping("/citas")
    public List<Cita> obtenerCitas() {
        return citaService.obtenerTodasLasCitas();
    }

    @GetMapping("/citas/{id}")
    public ResponseEntity<Cita> obtenerCitaPorId(@PathVariable Long id) {
        return new ResponseEntity<>(citaService.obtenerCitaPorId(id), HttpStatus.OK);
    }

    @PostMapping(value = "/citas",     consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> crearCita(@Valid @RequestBody Cita cita) {
        Cita nuevaCita = citaService.crearCita(cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }


    @PutMapping(value = "/citas/{id}",     consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> actualizarCita(@PathVariable Long id, @Valid @RequestBody Cita cita) {

        Cita citaActualizada = citaService.actualizarCita(id, cita);
        return new ResponseEntity<>(citaActualizada, HttpStatus.OK);
    }


    @DeleteMapping("/citas/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long id) {
        citaService.eliminarCita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
