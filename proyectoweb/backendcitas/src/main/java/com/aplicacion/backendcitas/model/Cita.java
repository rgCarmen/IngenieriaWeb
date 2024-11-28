package com.aplicacion.backendcitas.model;

import jakarta.persistence.Enumerated;
import lombok.*;
import jakarta.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "paciente_id")
    @NotNull
    private Paciente paciente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "medico_id")
    @NotNull
    private Medico medico;

    @NotNull(message = "La fecha y hora son obligatorias")
    @FutureOrPresent(message = "La cita no puede ser en el pasado")
    private LocalDateTime fechaHora;

    @Enumerated(EnumType.STRING)
    private TipoCita tipoCita;


    private String estado;  //  "Programada", "Cancelada", "Finalizada", etc.
    private String motivoConsulta; // Breve descripción del motivo de la cita

    public enum TipoCita {
        REVISION, CONSULTA, URGENCIA
    }
}