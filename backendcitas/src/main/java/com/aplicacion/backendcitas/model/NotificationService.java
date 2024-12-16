package com.aplicacion.backendcitas.model;

import com.aplicacion.backendcitas.model.entidades.Notificaciones;
import com.aplicacion.backendcitas.model.entidades.Usuario;

import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private notificacionRepository notificationRepository;

    public void crearNotificacion(String mensaje, Usuario usuarioId, LocalDateTime fecha) {
        Notificaciones notificacion = new Notificaciones();
        notificacion.setMensaje(mensaje);
        notificacion.setUsuario(usuarioId);
        notificacion.setFechaEnvio(fecha);
        notificationRepository.save(notificacion);
    }
}
