package com.aplicacion.backendcitas.model.entidades;

import java.sql.Date;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "notificaciones")
public class Notificaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false) // Clave foránea hacia la tabla Usuario
    private Usuario usuario;

    @Column(nullable = false, length = 500) // Mensaje obligatorio, con longitud máxima de 500 caracteres
    private String mensaje;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "fechaEnvio", nullable = false)
    private LocalDateTime fechaEnvio;

    // Constructores
    public Notificaciones() {
    }

    public Notificaciones(Usuario usuario, String mensaje, LocalDateTime fecha) {
        this.usuario = usuario;
        this.mensaje = mensaje;
        this.fechaEnvio = fecha;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public LocalDateTime getFechaEnvio(){
        return fechaEnvio;
    }

    public void setFechaEnvio(LocalDateTime fecha){
        this.fechaEnvio = fecha;
    }
}
