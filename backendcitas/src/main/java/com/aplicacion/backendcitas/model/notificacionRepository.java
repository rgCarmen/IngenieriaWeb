package com.aplicacion.backendcitas.model;

import com.aplicacion.backendcitas.model.entidades.Notificaciones;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface notificacionRepository extends JpaRepository<Notificaciones, Long> {
    List<Notificaciones> findByUsuarioId(Long usuarioId);
}
