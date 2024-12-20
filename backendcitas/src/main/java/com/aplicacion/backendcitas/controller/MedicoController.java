package com.aplicacion.backendcitas.controller;

import com.aplicacion.backendcitas.model.CitaService;
import com.aplicacion.backendcitas.model.MedicoRepository;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Medico;
import com.aplicacion.backendcitas.dto.MedicoDTO;
import jakarta.persistence.EntityNotFoundException;
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


@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private CitaService citaService;

    @Autowired
    private MedicoRepository medicoRepository;

    @GetMapping
    public List<Medico> obtenerTodosLosMedicos() {
        return medicoRepository.findAll();
    }

    @GetMapping("/especialidad/{especialidad}")
    public List<MedicoDTO> obtenerMedicosPorEspecialidad(@PathVariable String especialidad) {
        return medicoRepository.findByEspecialidad(especialidad)
                               .stream()
                               .map(m -> new MedicoDTO(m.getId(), m.getNombre(), m.getApellidos(), m.getEspecialidad()))
                               .toList();
    }

    @GetMapping("/especialidades")
    public ResponseEntity<List<String>> obtenerEspecialidades() {
        List<String> especialidades = medicoRepository.findAll()
                .stream()
                .map(Medico::getEspecialidad)
                .distinct()
                .toList();

        return ResponseEntity.ok(especialidades);
    }


    // Ver Agenda (ver todas citas)
    @GetMapping("/{usuarioId}/citas")
    public List<Cita> obtenerCitas(@PathVariable Long usuarioId) {
        return citaService.obtenerCitasPorMedico(usuarioId);
    
    }

    // Citas Libres
    @GetMapping("/{medicoId}/citas/libres")
    public List<Cita> obtenerCitasLibres(@PathVariable Long medicoId) {
        return citaService.obtenerCitasLibresMedico(medicoId);
    
    }


    // ver cita concreta (no se si será útil)
    @GetMapping("/{usuarioId}/citas/{id}")
    public Cita obtenerCitas(@PathVariable Long usuarioId, @PathVariable Long id) {
        return citaService.obtenerCitaPorId(id);
    
    }


    // Crear Cita
    @PostMapping("/{usuarioId}/citas")
    public ResponseEntity<Cita> crearCita(@PathVariable Long usuarioId, @RequestBody Cita cita) {
        try {
            // encontrar en la base de datos el médico
            Medico medico = medicoRepository.findByUsuarioId(usuarioId);
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
    @DeleteMapping("/{usuarioId}/citas/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long usuarioId, @PathVariable Long id) {
        try {
        Cita cita = citaService.obtenerCitaPorId(id);
        if (cita.getMedico().getUsuario().getId() != usuarioId) { //comprobar que sea una cita de ese medico
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
    @PutMapping(value = "/{usuarioId}/citas/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> actualizarCita(@PathVariable Long id,@PathVariable Long usuarioId ,@Valid @RequestBody Cita cita) {
         try{

             //comprobar que la cita a modificar sea de ese medico
            Cita citaExistente = citaService.obtenerCitaPorId(id);
            if (citaExistente.getMedico().getUsuario().getId() != usuarioId) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); 
            }

            Cita citaActualizada = citaService.actualizarCita(id, cita);
            return new ResponseEntity<>(citaActualizada, HttpStatus.OK);

         } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }    
        
    }


    @PutMapping(value = "/{usuarioId}/citasDiagnostico/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> actualizarDiagnostico(@PathVariable Long id,@PathVariable Long usuarioId ,@Valid @RequestBody Cita cita) {
         try{

             //comprobar que la cita a modificar sea de ese medico
            Cita citaExistente = citaService.obtenerCitaPorId(id);
            if (citaExistente.getMedico().getUsuario().getId() != usuarioId) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); 
            }

            Cita citaActualizada = citaService.actualizarDiagnostico(id, cita);
            return new ResponseEntity<>(citaActualizada, HttpStatus.OK);

         } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }    
        
    }

    
}
