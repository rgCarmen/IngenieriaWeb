package com.aplicacion.backendcitas.dto;

public class RegistroMedicoRequest {
    private String nombre;
    private String apellidos;
    private String telefono;
    private String especialidad;
    private String correo;
    private String password;

    // Getters y setters

    public String getNombre(){
        return this.nombre;
    }

    public String getApellidos(){
        return this.apellidos;
    }

    public String getTelefono(){
        return this.telefono;
    }

    public String getEspecialidad(){
        return this.especialidad;
    }

    public String getCorreo(){
        return this.correo;
    }

    public String getPassword(){
        return this.password;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public void setApellidos(String apellidos){
        this.apellidos = apellidos;
    }

    public void setTelefono(String telefono){
        this.telefono = telefono;
    }

    public void setEspecialidad(String especialidad){
        this.especialidad = especialidad;
    }

    public void setCorreo(String correo){
        this.correo = correo;
    }

    public void setPassword(String password){
        this.password = password;
    }
}

