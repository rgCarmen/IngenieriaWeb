package com.aplicacion.backendcitas.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;
import com.aplicacion.backendcitas.model.UsuarioRol;
import com.aplicacion.backendcitas.model.UsuarioService;
import com.aplicacion.backendcitas.model.entidades.Usuario;

@RestController
@RequestMapping(path = "/login")
public class LoginController {

    // Variable estática para almacenar el rol del usuario
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/autenticar")
    public ResponseEntity<?> autenticarUsuario(@RequestBody CredencialesDTO credenciales) {
        try {
            // Lógica de autenticación
            String email= credenciales.getEmail();
            String contrasena=  String.valueOf(credenciales.getContrasena().hashCode());
            UsuarioRol rol = usuarioService.obtenerRol(email, contrasena);
            Long id= usuarioService.obtenerId(email, contrasena);
           
            Map<String, Object> response = new HashMap<>();
            response.put("autentificar", true);
            response.put("rol", rol);
            response.put("id",id);


            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage() );
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Limpiar la variable estática al cerrar sesión
        Map<String, Object> response = new HashMap<>();
        response.put("logout",true);
        return  ResponseEntity.ok(response);
    }

    @PostMapping("/registrar")
    public Usuario registrarUsuario(@RequestBody Usuario usuario){
        Usuario u= usuarioService.crearUsuario(usuario);
        u.setContrasena(null);

        return u;

    }
}

