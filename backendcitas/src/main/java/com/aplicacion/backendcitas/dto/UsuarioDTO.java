package com.aplicacion.backendcitas.dto;

public class UsuarioDTO {

    private String email;
    private String contrasena;
    private String nombre;
    //nombre, apellidos, dni, telefono, email

    // Getters y setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
