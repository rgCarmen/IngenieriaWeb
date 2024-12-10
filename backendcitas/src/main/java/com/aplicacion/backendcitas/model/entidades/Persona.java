package com.aplicacion.backendcitas.model.entidades;

import jakarta.persistence.MappedSuperclass;


@MappedSuperclass //para que no cree la tabla en la base de datos
public abstract class Persona {

    private String nombre;
    private String apellidos;
    private String email;
    private String telefono;

    public Persona(){

    }

    public Persona(String nombre, String apellidos, String email, String telefono){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.email=email;
        this.telefono=telefono;
    }


    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre=nombre;
    }

    public String getApellidos(){
        return apellidos;
    }

    public void setApellidos(String apellidos){
        this.apellidos=apellidos;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public String getTelefono(){
        return telefono;
    }

    public void setTelefono(String telefono){
        this.telefono=telefono;
    }

    
}
