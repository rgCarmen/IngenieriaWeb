package com.aplicacion.backendcitas.dto;



public class MedicoDTO {
    private Long id;
    private String nombreCompleto;
    private String especialidad;

    public MedicoDTO(Long id, String nombre, String apellidos, String especialidad) {
        this.id = id;
        this.nombreCompleto = nombre + " " + apellidos;
        this.especialidad = especialidad;
    }

    // Getters y setters
    public Long getId() { return id; }
    public String getNombreCompleto() { return nombreCompleto; }
    public String getEspecialidad() { return especialidad; }
}
