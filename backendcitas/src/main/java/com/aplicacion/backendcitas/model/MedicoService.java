package com.aplicacion.backendcitas.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion.backendcitas.model.entidades.Medico;

@Service
public class MedicoService {
 
    @Autowired
    MedicoRepository medicoRepository;

    public Medico crearMedico(Medico medico){
        return medicoRepository.saveAndFlush(medico);
    }

    public Medico obtenerMedico(long id){
        return medicoRepository.findByUsuarioId(id);
    }
    
}
