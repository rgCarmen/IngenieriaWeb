package com.aplicacion.backendcitas.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion.backendcitas.model.entidades.Usuario;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioRol obtenerRol(String email, String hashcontrasena) {
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

    public long obtenerId(String email, String hashcontrasena) {
        // Buscar el usuario en la base de datos
        Usuario usuario = usuarioRepository.findByEmailAndContrasena(email, hashcontrasena);

        if (usuario != null) {
            // Si el usuario existe, devolver el rol
            return usuario.getId();
        } else {
            // Si no se encuentra, devolver un mensaje de error
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
    }

    public Usuario crearUsuario(Usuario usuario){
        usuario.setConfirmarContrasena(usuario.getContrasena());
        int contrasenaHashed = usuario.getContrasena().hashCode();
        usuario.setContrasena(String.valueOf(contrasenaHashed));
      
        return usuarioRepository.saveAndFlush(usuario);
    }

    public Usuario registrarUsuario(Usuario usuario) {
        // Validar si el email ya existe en la base de datos
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado.");
        }
        // Guardar el usuario en la base de datos
        return crearUsuario(usuario);
    }
    

}


