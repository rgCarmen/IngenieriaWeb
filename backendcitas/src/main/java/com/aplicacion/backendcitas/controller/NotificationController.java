package com.aplicacion.backendcitas.controller;

import java.util.Arrays;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @GetMapping
    public ResponseEntity<List<String>> getNotifications(@RequestParam String role) {
        if ("paciente".equalsIgnoreCase(role)) {
            return ResponseEntity.ok(Arrays.asList("Nueva cita creada el 2024-12-05 a las 10:00 con Dr. López."));
        } else if ("doctor".equalsIgnoreCase(role)) {
            return ResponseEntity.ok(Arrays.asList("Tienes una nueva cita asignada el 2024-12-05 a las 10:00 con el paciente Ana Pérez."));
        } else {
            return ResponseEntity.ok(Arrays.asList());
        }
    }
}
