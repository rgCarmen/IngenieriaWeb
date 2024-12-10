package com.aplicacion.backendcitas.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicacion.backendcitas.model.entidades.Medico;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
}
