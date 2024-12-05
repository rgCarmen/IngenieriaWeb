package com.aplicacion.backendcitas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;
import com.aplicacion.backendcitas.model.UsuarioRol;
import com.aplicacion.backendcitas.model.UsuarioService;

@RestController
@RequestMapping(path = "/login") // Ruta base para los endpoints relacionados con "login"
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/autenticar")
    public ResponseEntity<?> autenticarUsuario(@RequestBody CredencialesDTO credenciales) {
        try {
            // Obtener el rol del usuario
            UsuarioRol rol = usuarioService.obtenerRol(credenciales.getEmail(), credenciales.getContrasena());
            return ResponseEntity.ok().body("Rol del usuario: " + rol);
        } catch (RuntimeException e) {
            // Manejar error de autenticación
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
