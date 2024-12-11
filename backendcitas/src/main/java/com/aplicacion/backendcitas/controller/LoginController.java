package com.aplicacion.backendcitas.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;
import com.aplicacion.backendcitas.model.UsuarioRol;
import com.aplicacion.backendcitas.model.UsuarioService;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Usuario;

@RestController
@RequestMapping(path = "/login")
public class LoginController {

    // Variable estática para almacenar el rol del usuario
    private static UsuarioRol rolUsuario;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/autenticar")
    public ResponseEntity<?> autenticarUsuario(@RequestBody CredencialesDTO credenciales) {
        try {
            // Lógica de autenticación
            UsuarioRol rol = usuarioService.obtenerRol(credenciales.getEmail(),  String.valueOf(credenciales.getContrasena().hashCode()));
            
            // Guardar el rol del usuario en la variable estática
            rolUsuario = rol;  // Convertir el rol a cadena para guardar
            Map<String, Object> response = new HashMap<>();
            response.put("autentificar", true);
            response.put("rol", rol);


            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage() + credenciales.getContrasena().hashCode() );
        }
    }

    @GetMapping("/obtenerRol")
    public ResponseEntity<?> obtenerRol() {
        // Devolver el rol guardado en la variable estática
        if (rolUsuario != null) {
            return ResponseEntity.ok().body("Rol actual del usuario: " + rolUsuario);
        } else {
            return ResponseEntity.status(401).body("No se ha autenticado ningún usuario.");
        }
    }

    @GetMapping("/logout")
    public String logout() {
        // Limpiar la variable estática al cerrar sesión
        rolUsuario = null;
        return "Has cerrado sesión correctamente.";
    }

    @PostMapping("/registrar")
    public Usuario registrarUsuario(@RequestBody Usuario usuario){
        Usuario u= usuarioService.crearUsuario(usuario);
        u.setContrasena(null);

        return u;

    }
}

