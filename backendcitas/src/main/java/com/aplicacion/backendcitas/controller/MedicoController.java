package com.aplicacion.backendcitas.controller;

import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.model.CitaService;
import com.aplicacion.backendcitas.model.MedicoRepository;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Medico;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private CitaService citaService;

    @Autowired
    private MedicoRepository medicoRepository;


    // Ver Agenda (ver todas citas)
    @GetMapping("/{medicoId}/citas")
    public List<Cita> obtenerCitas(@PathVariable Long medicoId) {
        return citaService.obtenerCitasPorMedico(medicoId);
    
    }

    // ver cita concreta (no se si será útil)
    @GetMapping("/{medicoId}/citas/{id}")
    public Cita obtenerCitas(@PathVariable Long medicoId, @PathVariable Long id) {
        return citaService.obtenerCitaPorId(id);
    
    }


    // Crear Cita
    @PostMapping("/{medicoId}/citas")
    public ResponseEntity<Cita> crearCita(@PathVariable Long medicoId, @RequestBody Cita cita) {
        // encontrar en la base de datos el médico
        Medico medico = medicoRepository.findById(medicoId)
        .orElseThrow(() -> new EntityNotFoundException("Médico no encontrado con ID: " + medicoId));

        try {
            cita.setMedico(medico); // Asignar el ID del médico
            Cita nuevaCita = citaService.crearCita(cita);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch( EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    // Eliminar Cita
    @DeleteMapping("/{medicoId}/citas/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long medicoId, @PathVariable Long id) {
        try {
        Cita cita = citaService.obtenerCitaPorId(id);
        if (cita.getMedico().getId() != medicoId) { //comprobar que sea una cita de ese medico
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); 
        }
        if (cita.getFecha().isBefore(LocalDateTime.now())) { // que no sea una cita pasada
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); 
        }

        citaService.eliminarCita(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 si la cita no existe
        }
    }


    // Modificar Cita (hora válida y tipo?)
    @PutMapping(value = "/{medicoId}/citas/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> actualizarCita(@PathVariable Long id,@PathVariable Long medicoId ,@Valid @RequestBody Cita cita) {
         try{

             //comprobar que la cita a modificar sea de ese medico
            Cita citaExistente = citaService.obtenerCitaPorId(id);
            if (citaExistente.getMedico().getId() != medicoId) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); 
            }

            Cita citaActualizada = citaService.actualizarCita(id, cita);
            return new ResponseEntity<>(citaActualizada, HttpStatus.OK);

         } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }    
        
    }

    
}
