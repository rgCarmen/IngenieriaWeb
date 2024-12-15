package com.aplicacion.backendcitas.model.entidades;

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

    // Constructores
    public Notificaciones() {
    }

    public Notificaciones(Usuario usuario, String mensaje) {
        this.usuario = usuario;
        this.mensaje = mensaje;
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
}
