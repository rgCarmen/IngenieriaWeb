package com.aplicacion.backendcitas.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; 

@Entity
public class Medico extends Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String especialidad;
    
    public Medico(){
        super();
    }

    public Medico(String nombre, String apellidos, String correo, String telefono, String especialidad){
        super(nombre, apellidos, correo, telefono);
        this.especialidad=especialidad;
    }

    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id=id;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }
}
