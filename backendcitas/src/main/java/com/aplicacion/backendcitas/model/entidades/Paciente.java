package com.aplicacion.backendcitas.model.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; 

@Entity
public class Paciente extends Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String dni;

    public Paciente(){
        super();
    }

    public Paciente(long id, String nombre, String apellidos, String correo, String telefono, String dni, Usuario usuario){
        super(nombre, apellidos, correo, telefono, usuario);
        this.dni=dni;
       
    }

    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id=id;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }
    
}