package com.aplicacion.backendcitas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;
import com.aplicacion.backendcitas.dto.UsuarioDTO;
import com.aplicacion.backendcitas.model.UsuarioRol;
import com.aplicacion.backendcitas.model.UsuarioService;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Usuario;

@RestController
@RequestMapping(path = "/registro")
public class RegistroController {

    @Autowired
    private UsuarioService usuarioService; // Usamos UsuarioService para gestionar los usuarios

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarPaciente(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            // Crear un objeto Usuario desde el DTO recibido
            Usuario nuevoPaciente = new Usuario();
            nuevoPaciente.setEmail(usuarioDTO.getEmail());
            nuevoPaciente.setContrasena(usuarioDTO.getContrasena());
            nuevoPaciente.setNombre(usuarioDTO.getNombre());
            nuevoPaciente.setRol(UsuarioRol.PACIENTE); // Definimos el rol como "PACIENTE"

            // Guardar el paciente en la base de datos
            Usuario usuarioRegistrado = usuarioService.registrarUsuario(nuevoPaciente);

            return ResponseEntity.status(201).body("Paciente registrado correctamente con ID: " + usuarioRegistrado.getId());
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body("Error al registrar el paciente: " + e.getMessage());
        }
    }

}

