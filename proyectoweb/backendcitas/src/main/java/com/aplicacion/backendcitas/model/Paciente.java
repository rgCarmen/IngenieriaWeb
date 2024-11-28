package com.aplicacion.backendcitas.model;

import lombok.*;
import jakarta.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;


@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser en el pasado")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "El DNI/NIE es obligatorio")
    private String dniNie;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^\\d{9}$", message = "El teléfono debe tener 9 dígitos") // Ajusta la expresión regular según tus necesidades
    private String telefono;

    @Email(message = "El correo electrónico debe ser válido")
    private String email;

    private String direccion;

    private String codigoPostal;

    private String ciudad;

    private String provincia;
}
