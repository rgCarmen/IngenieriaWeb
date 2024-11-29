package com.aplicacion.backendcitas.model;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;


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
        boolean existeCita = citaRepository.existsByMedicoAndFecha(cita.getMedico(), cita.getFecha());
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
        citaRepository.deleteById(id);
    }


    public List<Cita> obtenerCitasPorPaciente(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId);
    }

    public List<Cita> obtenerCitasPorMedico(Long medicoId) {
        return citaRepository.findByMedicoId(medicoId);
    }

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



}
