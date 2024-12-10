package com.aplicacion.backendcitas.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método para buscar un usuario por nombre y contraseña
    Usuario findByEmailAndContrasena(String nombre, String contrasena);
}