package com.aplicacion.backendcitas.model;

import com.aplicacion.backendcitas.model.entidades.Medico;
import com.aplicacion.backendcitas.model.entidades.Paciente;
import com.aplicacion.backendcitas.model.entidades.Usuario;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    public UsuarioRol obtenerRol(String email, String hashcontrasena) {
        // Buscar el usuario en la base de datos
        Usuario usuario = usuarioRepository.findByEmailAndContrasena(email, hashcontrasena);

        if (usuario != null) {
            // Si el usuario existe, devolver el rol
            return usuario.getRol();
        } else {
            // Si no se encuentra, devolver un mensaje de error
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
    }

    public long obtenerId(String email, String hashcontrasena) {
        // Buscar el usuario en la base de datos
        Usuario usuario = usuarioRepository.findByEmailAndContrasena(email, hashcontrasena);

        if (usuario != null) {
            // Si el usuario existe, devolver el rol
            return usuario.getId();
        } else {
            // Si no se encuentra, devolver un mensaje de error
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
    }

    public Usuario crearUsuario(Usuario usuario){
        usuario.setConfirmarContrasena(usuario.getContrasena());
        int contrasenaHashed = usuario.getContrasena().hashCode();
        usuario.setContrasena(String.valueOf(contrasenaHashed));
      
        return usuarioRepository.saveAndFlush(usuario);
    }

    public Usuario registrarUsuario(Usuario usuario) {
        // Validar si el email ya existe en la base de datos
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado.");
        }
        // Guardar el usuario en la base de datos
        return crearUsuario(usuario);
    }
    
    
    public Usuario actualizarUsuario(Long id, Usuario updatedUsuario, String nombre, String apellidos, String telefono) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // Actualizar email y contraseña del usuario
            usuario.setEmail(updatedUsuario.getEmail());
            if (updatedUsuario.getContrasena() != null && !updatedUsuario.getContrasena().isEmpty()) {
                int contrasenaHashed = updatedUsuario.getContrasena().hashCode();
                usuario.setContrasena(String.valueOf(contrasenaHashed));
            }

            // Actualizar nombre, apellidos y teléfono según el rol del usuario
            if (usuario.getRol() == UsuarioRol.PACIENTE) {
                Paciente paciente = pacienteRepository.findByUsuarioId(id);
                if (paciente != null) {
                    paciente.setNombre(nombre);
                    paciente.setApellidos(apellidos);
                    paciente.setTelefono(telefono);
                    pacienteRepository.saveAndFlush(paciente);
                }
            } else if (usuario.getRol() == UsuarioRol.MEDICO) {
                Medico medico = medicoRepository.findByUsuarioId(id);
                if (medico != null) {
                    medico.setNombre(nombre);
                    medico.setApellidos(apellidos);
                    medico.setTelefono(telefono);
                    medicoRepository.saveAndFlush(medico);
                }
            }

            // Guardar los cambios en el usuario
            return usuarioRepository.saveAndFlush(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
    }

}


