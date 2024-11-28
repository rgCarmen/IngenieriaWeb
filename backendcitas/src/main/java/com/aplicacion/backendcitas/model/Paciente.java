package com.aplicacion.backendcitas.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Paciente extends Persona {

    public Paciente(long id, String nombre, String apellidos, String correo){
        super(id, nombre, apellidos, correo);
       
    }
    
}
