package com.aplicacion.backendcitas.model;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;
    @Autowired
    private PacienteRepository pacienteRepository;
    @Autowired
    private MedicoRepository medicoRepository;


    public List<Cita> obtenerTodasLasCitas() {
        return citaRepository.findAll();
    }


    public Cita obtenerCitaPorId(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cita no encontrada con ID: " + id));
    }

    public Cita crearCita(Cita cita) {

        Optional<Paciente> paciente = pacienteRepository.findById(cita.getPaciente().getId());
        Optional<Medico> medico = medicoRepository.findById(cita.getMedico().getId());

        if (paciente.isEmpty() || medico.isEmpty()) {
            throw new EntityNotFoundException("Paciente o médico no encontrado");
        }

        if (!medico.get().isDisponible()) {
            throw new IllegalArgumentException("El médico no está disponible en esa fecha y hora.");
        }

        cita.setEstado("Programada");

        return citaRepository.save(cita);
    }


    public Cita actualizarCita(Long id, Cita citaActualizada) {
        Cita citaExistente = obtenerCitaPorId(id);

        citaExistente.setFechaHora(citaActualizada.getFechaHora());
        citaExistente.setTipoCita(citaActualizada.getTipoCita());
        citaExistente.setMotivoConsulta(citaActualizada.getMotivoConsulta());
        citaExistente.setEstado(citaActualizada.getEstado());

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

    public List<Cita> obtenerCitasPorEstado(String estado) {
        return citaRepository.findByEstado(estado);
    }

}