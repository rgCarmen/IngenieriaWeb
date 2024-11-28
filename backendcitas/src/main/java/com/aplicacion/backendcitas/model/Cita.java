package com.aplicacion.backendcitas.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Date fecha;

    @ManyToOne(cascade = CascadeType.ALL)
    private Paciente paciente;

    @ManyToOne(cascade = CascadeType.ALL)
    private Medico medico;

    public Cita(){

    }

    public Cita(Date fecha, Medico medico){
        this.fecha=fecha;
        this.medico=medico;
    }

    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id=id;
    }

    public Date getFecha(){
        return fecha;
    }

    public void setFecha(Date fecha){
        this.fecha=fecha;
    }

    public Paciente getPaciente(){
        return paciente;
    }

    public void setPaciente(Paciente paciente){
        this.paciente=paciente;
    }

    public Medico getMedico(){
        return medico;
    }

    public void setMedico(Medico medico){
        this.medico=medico;
    }

    @Override
    public boolean equals(Object o){
        return (o instanceof Cita) && ((Cita) o).getId()==this.id;
    }
  
    @Override
    public int hashCode(){
        return (int)id;
    }

    
}
