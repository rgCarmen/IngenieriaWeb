package com.aplicacion.backendcitas.controller;

import com.aplicacion.backendcitas.model.entidades.Notificaciones;
import com.aplicacion.backendcitas.model.notificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private notificacionRepository notificacionRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getNotifications(@RequestParam Long usuarioId) {
        List<Notificaciones> notifications = notificacionRepository.findByUsuarioId(usuarioId);

        List<Map<String, Object>> response = notifications.stream().map(notification -> {
            Map<String, Object> item = new HashMap<>();
            item.put("mensaje", notification.getMensaje());
            item.put("date", notification.getFechaEnvio()); // Ejemplo de fecha actual
            return item;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

}
