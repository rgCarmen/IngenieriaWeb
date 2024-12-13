package com.aplicacion.backendcitas.dto;

public class UsuarioDTO {

    private String email;
    private String contrasena;
    private String nombre;
    private String apellidos;
    private String dni;
    private String telefono;
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

    public String  getApellidos(){
        return this.apellidos;
    }

    public void setApellidos(String apellidos){
        this.apellidos=apellidos;
    }

    public String getTelefono(){
        return this.telefono;
    }

    public void setTelefono(String telefono){
        this.telefono=telefono;
    }

    public String getDni() {
       return this.dni;
    }

    public void setDni(String dni){
        this.dni=dni;
    }
}
