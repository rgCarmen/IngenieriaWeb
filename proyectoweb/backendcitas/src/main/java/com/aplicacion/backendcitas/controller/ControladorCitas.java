package com.aplicacion.backendcitas.controller;

import com.aplicacion.backendcitas.model.Cita;
import com.aplicacion.backendcitas.model.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/citas")
public class ControladorCitas {

    @Autowired
    private CitaService citaService;


    @GetMapping
    public List<Cita> obtenerCitas() {
        return citaService.obtenerTodasLasCitas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtenerCitaPorId(@PathVariable Long id) {
        return new ResponseEntity<>(citaService.obtenerCitaPorId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Cita> crearCita(@Valid @RequestBody Cita cita) {
        Cita nuevaCita = citaService.crearCita(cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Cita> actualizarCita(@PathVariable Long id, @Valid @RequestBody Cita cita) {

        Cita citaActualizada = citaService.actualizarCita(id, cita);
        return new ResponseEntity<>(citaActualizada, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long id) {
        citaService.eliminarCita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
