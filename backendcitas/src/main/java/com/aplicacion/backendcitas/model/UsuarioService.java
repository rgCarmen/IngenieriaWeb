package com.aplicacion.backendcitas.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioRol obtenerRol(String email, int hashcontrasena) {
        // Buscar el usuario en la base de datos
        Usuario usuario = usuarioRepository.findByEmailAndContrasena(email, hashcontrasena);

        if (usuario != null) {
            // Si el usuario existe, devolver el rol
            return usuario.getRol();
        } else {
            // Si no se encuentra, devolver un mensaje de error
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
    }
}