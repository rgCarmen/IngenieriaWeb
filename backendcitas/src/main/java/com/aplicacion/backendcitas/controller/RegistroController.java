package com.aplicacion.backendcitas.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;
import com.aplicacion.backendcitas.dto.UsuarioDTO;
import com.aplicacion.backendcitas.model.PacienteService;
import com.aplicacion.backendcitas.model.UsuarioRol;
import com.aplicacion.backendcitas.model.UsuarioService;
import com.aplicacion.backendcitas.model.entidades.Cita;
import com.aplicacion.backendcitas.model.entidades.Paciente;
import com.aplicacion.backendcitas.model.entidades.Usuario;

@RestController
@RequestMapping(path = "/registro")
public class RegistroController {

    @Autowired
    private UsuarioService usuarioService; // Usamos UsuarioService para gestionar los usuarios

    @Autowired
    private PacienteService pacienteService;

    @PostMapping(value="/registrar", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> registrarPaciente(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            // Crear un objeto Usuario desde el DTO recibido
            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setEmail(usuarioDTO.getEmail());
            nuevoUsuario.setContrasena(usuarioDTO.getContrasena());
            nuevoUsuario.setRol(UsuarioRol.PACIENTE); // Definimos el rol como "PACIENTE"

            // Guardar el usuario paciente en la base de datos
            Usuario usuarioRegistrado = usuarioService.registrarUsuario(nuevoUsuario);

            // Registramos el paciente en la tabla Paciente
            Paciente nuevoPaciente= new Paciente(usuarioDTO.getNombre(), usuarioDTO.getApellidos(), usuarioDTO.getTelefono(), usuarioDTO.getDni(), usuarioRegistrado);
            pacienteService.crearPaciente(nuevoPaciente);


            Map<String, Object> response = new HashMap<>();
            response.put("registro", true);

            return ResponseEntity.status(201).body(response);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al registrar el paciente: " + e.getMessage());
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

}

