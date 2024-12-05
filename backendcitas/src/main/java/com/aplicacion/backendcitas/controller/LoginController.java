package com.aplicacion.backendcitas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;
import com.aplicacion.backendcitas.model.UsuarioRol;
import com.aplicacion.backendcitas.model.UsuarioService;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping(path = "/login") // Ruta base para los endpoints relacionados con "login"
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/autenticar")
    public ResponseEntity<?> autenticarUsuario(@RequestBody CredencialesDTO credenciales, HttpServletRequest request) {
        try {
            UsuarioRol rol = usuarioService.obtenerRol(credenciales.getEmail(), credenciales.getContrasena());
    
            // Obtener la sesión de la solicitud
            HttpSession session = request.getSession();
            session.setAttribute("rol", rol);
    
            return ResponseEntity.ok().body("Autenticado correctamente, rol: " + rol);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // Invalida la sesión actual
        return "Has cerrado sesión correctamente.";
    }

}
