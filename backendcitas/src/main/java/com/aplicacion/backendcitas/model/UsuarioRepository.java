package com.aplicacion.backendcitas.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicacion.backendcitas.model.entidades.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método para buscar un usuario por nombre y contraseña
    Usuario findByEmailAndContrasena(String nombre, String contrasena);
    Optional<Usuario> findByEmail(String email);
}