package com.aplicacion.backendcitas.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion.backendcitas.model.entidades.Paciente;

@Service
public class PacienteService {
    
    @Autowired
    PacienteRepository pacienteRepository;

    public Paciente crearPaciente(Paciente paciente){
        return pacienteRepository.saveAndFlush(paciente);
    }

    public Paciente obtenerPaciente(long id){
        return pacienteRepository.findByUsuarioId(id);
    }
}
