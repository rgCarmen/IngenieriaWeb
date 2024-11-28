package com.aplicacion.backendcitas.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Medico extends Persona {

    private String especialidad;
    

    public Medico(long id, String nombre, String apellidos, String correo, String especialidad){
        super(id, nombre, apellidos, correo);
        this.especialidad=especialidad;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }
}
