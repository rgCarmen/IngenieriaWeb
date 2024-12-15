package com.aplicacion.backendcitas.model;


import com.aplicacion.backendcitas.model.entidades.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Paciente findByUsuarioId(Long usuarioId);
    Paciente findByNombreAndApellidos(String nombre, String apellidos);
}
