package com.aplicacion.backendcitas.model;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;
    private PacienteRepository pacienteRepository;


    public List<Cita> obtenerTodasLasCitas() {
        return citaRepository.findAll();
    }


    public Cita obtenerCitaPorId(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cita no encontrada con ID: " + id));
    }

    public Cita crearCita(Cita cita) {

        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La fecha de la cita no puede ser anterior a la fecha y hora actual.");
        }
        boolean existeCita = citaRepository.existsByMedicoIdAndFecha(cita.getMedico().getId(), cita.getFecha());
        if (existeCita) {
            throw new IllegalArgumentException("Ya existe una cita para el mismo médico en la misma fecha y hora.");
        }

        return citaRepository.saveAndFlush(cita);
    }


    public Cita actualizarCita(Long id, Cita citaActualizada) {
        Cita citaExistente = obtenerCitaPorId(id);

        if (citaActualizada.getFecha().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La fecha de la cita no puede ser anterior a la fecha y hora actual.");
        }
        citaExistente.setFecha(citaActualizada.getFecha());
        citaExistente.setTipoCita(citaActualizada.getTipoCita());
        citaExistente.setPaciente(citaActualizada.getPaciente());


        return citaRepository.save(citaExistente);
    }

    public void eliminarCita(Long id) {
        Cita cita = obtenerCitaPorId(id);
        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("No se pueden eliminar citas pasadas.");
        }
    
        citaRepository.delete(cita);
    }


    public List<Cita> obtenerCitasLibres(Long medicoId, String especialidad) {
        if (medicoId != null) {
            return citaRepository.findByMedicoIdAndPacienteIsNull(medicoId);
        } else if (especialidad != null) {
            return citaRepository.findByMedicoEspecialidadAndPacienteIsNull(especialidad);
        } else {
            //devolver citas libres
            return citaRepository.findByPacienteIsNull();
        }
    }

    public Cita asignarCita(long citaId, long pacienteId) {
        // Asignar cita a un paciente
        Cita cita= obtenerCitaPorId(citaId);
        if (cita.getPaciente() !=null){
            throw new IllegalArgumentException("La cita ya tiene asignado un paciente");
        }

        Paciente paciente = pacienteRepository.findById(pacienteId)
        .orElseThrow(() -> new EntityNotFoundException("Paciente no encontrado con ID: " + pacienteId));

        cita.setPaciente(paciente);
        return citaRepository.save(cita);
    }

    public Cita cancelarCita(long citaId) {
        // cancelar la cita por parte del paciente
        Cita cita = obtenerCitaPorId(citaId);

        if (cita.getPaciente() == null) {
            throw new IllegalArgumentException("La cita no está asignada a ningún paciente.");
        }

        cita.setPaciente(null); 
        return citaRepository.save(cita);
    }



    public List<Cita> obtenerCitasPorPaciente(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId);
    }

    public List<Cita> obtenerCitasPorMedico(Long medicoId) {
        return citaRepository.findByMedicoId(medicoId);
    }


    /* 
    public List<Cita> obtenerCitasPorRangoFechas(LocalDateTime fechaInicio, LocalDateTime fechaFin) {

        Specification<Cita> spec = Specification.where(null);

        if (fechaInicio != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("fechaHora"), fechaInicio));
        }
        if (fechaFin != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("fechaHora"), fechaFin));
        }

        return citaRepository.findAll(spec);

    }
        */



}
