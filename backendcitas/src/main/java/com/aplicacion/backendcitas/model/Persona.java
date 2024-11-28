package com.aplicacion.backendcitas.model;


public abstract class Persona {

    private long id;
    private String nombre;
    private String apellidos;
    private String correo;

    public Persona(long id, String nombre, String apellidos, String correo){
        this.id=id;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.correo=correo;
    }

    public long getId(){
        return id;
    }

    public void setId(long id){
        this.id=id;
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre=nombre;
    }

    public String getApellidos(){
        return apellidos;
    }

    public void setApellidos(String apellidos){
        this.apellidos=apellidos;
    }

    public String getCorreo(){
        return correo;
    }

    public void setCorreo(String correo){
        this.correo=correo;
    }

    @Override
    public boolean equals(Object o){
        return (o instanceof Persona) && ((Persona) o).getId()==this.id;
    }
  
    @Override
    public int hashCode(){
        return (int)id;
    }

    
}
