package com.aplicacion.backendcitas.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.aplicacion.backendcitas.model.entidades.Cita;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface CitaRepository extends JpaRepository<Cita, Long>, JpaSpecificationExecutor<Cita> {

    List<Cita> findByPacienteId(Long pacienteId);

    List<Cita> findByMedicoId(Long medicoId);
    boolean existsByMedicoIdAndFecha(Long medicoId, LocalDateTime fecha);

    List<Cita> findByMedicoIdAndPacienteIsNull(Long medicoId);

    List<Cita> findByMedicoEspecialidadAndPacienteIsNull(String especialidad);

    List<Cita> findByPacienteIsNull();
}
