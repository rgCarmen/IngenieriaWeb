package com.aplicacion.backendcitas.model;

import lombok.*;

import jakarta.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    @NotBlank(message = "La especialidad es obligatoria")
    private String especialidad;

    @NotBlank(message = "El número de colegiado es obligatorio")
    private String numeroColegiado;  // o identificador profesional

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^\\d{9}$", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @Email(message = "El correo electrónico debe ser válido")
    private String email;

    // Campos para la gestión de la disponibilidad (se puede ampliar)
    private boolean disponible; // Un campo simple para indicar disponibilidad general
    // Se podrian añadir datos mas especificos


}
