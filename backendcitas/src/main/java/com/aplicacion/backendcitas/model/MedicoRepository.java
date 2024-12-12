package com.aplicacion.backendcitas.model;

import com.aplicacion.backendcitas.model.entidades.Medico;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    List<Medico> findAll();
    List<Medico> findByEspecialidad(String especialidad);
    Medico findByUsuarioId(Long usuarioId);
}
