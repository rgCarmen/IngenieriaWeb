package com.aplicacion.backendcitas.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion.backendcitas.dto.CredencialesDTO;

@RestController
@RequestMapping(path = "/login") // Ruta base para los endpoints relacionados con "login"
public class LoginController {

    @PostMapping("/usuario")
    public ResponseEntity<?> recibirCredenciales(@RequestBody CredencialesDTO credenciales) {
        System.out.println("Usuario: " + credenciales.getUsuario());
        System.out.println("Contraseña: " + credenciales.getContrasena());

        // Puedes implementar lógica de autenticación aquí
        return ResponseEntity.ok().body("Credenciales recibidas correctamente");
    }

}
