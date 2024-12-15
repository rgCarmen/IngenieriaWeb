package com.aplicacion.backendcitas.controller;

import com.aplicacion.backendcitas.model.UsuarioService;
import com.aplicacion.backendcitas.model.entidades.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registro/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
        @PathVariable Long id,
        @RequestBody Usuario usuario,
        @RequestParam String nombre,
        @RequestParam String apellidos,
        @RequestParam String telefono) {
        
        Usuario updatedUsuario = usuarioService.actualizarUsuario(id, usuario, nombre, apellidos, telefono);
        return ResponseEntity.ok(updatedUsuario);
    }

}
