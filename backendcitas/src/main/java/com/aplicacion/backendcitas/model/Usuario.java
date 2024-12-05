package com.aplicacion.backendcitas.model;

import org.antlr.v4.runtime.misc.NotNull;

import jakarta.persistence.*;
//import jakarta.validation.constraints.*;

@Entity // Marca esta clase como una entidad JPA que será mapeada a una tabla en la base de datos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genera un ID único automáticamente
    private Long id;
    private String nombre;
    @Column(unique = true) // Restringe duplicados en la base de datos
    private String email;
    private int contrasena;
    @Enumerated(EnumType.STRING)
    private UsuarioRol rol;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getContrasena() {
        return contrasena;
    }

    public void setContrasena(int contrasena) {
        this.contrasena = contrasena;
    }

    public UsuarioRol getRol(){
        return rol;
    }

    public void setRol(UsuarioRol rol){
        this.rol = rol;
    }
}
