package com.aplicacion.backendcitas.model;

import com.aplicacion.backendcitas.model.entidades.Notificaciones;
import com.aplicacion.backendcitas.model.entidades.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private notificacionRepository notificationRepository;

    public void crearNotificacion(String mensaje, Usuario usuarioId) {
        Notificaciones notificacion = new Notificaciones();
        notificacion.setMensaje(mensaje);
        notificacion.setUsuario(usuarioId);
        notificationRepository.save(notificacion);
    }
}