package com.aplicacion.backendcitas.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "cita", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"medico_id", "fecha"})
})
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = true) // Relación opcional con Paciente
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "medico_id", nullable = false) // Relación obligatoria con Medico
    private Medico medico;

    @Enumerated(EnumType.STRING)
    private TipoCita tipoCita;

    public Cita() {}

    public Cita(LocalDateTime fecha, Medico medico) {
        if (fecha.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La fecha debe ser mayor a la fecha y hora actual");
        }
        this.fecha = fecha;
        this.medico = medico;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        if (fecha.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La fecha debe ser mayor a la fecha y hora actual");
        }
        this.fecha = fecha;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public TipoCita getTipoCita(){
        return tipoCita;
    }

    public void setTipoCita(TipoCita tipoCita){
        this.tipoCita=tipoCita;
    }
}
