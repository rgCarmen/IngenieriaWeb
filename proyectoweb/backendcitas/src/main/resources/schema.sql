CREATE TABLE IF NOT EXISTS PACIENTE (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          apellidos VARCHAR(255) NOT NULL,
                          fecha_nacimiento DATE NOT NULL,
                          dni_nie VARCHAR(20) NOT NULL,
                          telefono VARCHAR(20) NOT NULL,
                          email VARCHAR(255),
                          direccion VARCHAR(255),
                          codigo_postal VARCHAR(10),
                          ciudad VARCHAR(255),
                          provincia VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS MEDICO (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(255) NOT NULL,
                        apellidos VARCHAR(255) NOT NULL,
                        especialidad VARCHAR(255) NOT NULL,
                        numero_colegiado VARCHAR(50) NOT NULL,
                        telefono VARCHAR(20) NOT NULL,
                        email VARCHAR(255),
                        disponible BOOLEAN
);

CREATE TABLE IF NOT EXISTS CITA (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      paciente_id BIGINT NOT NULL,
                      medico_id BIGINT NOT NULL,
                      fecha_hora DATETIME NOT NULL,  -- O TIMESTAMP si lo prefieres
                      tipo_cita VARCHAR(50),
                      estado VARCHAR(50),
                      motivo_consulta VARCHAR(255),
                      FOREIGN KEY (paciente_id) REFERENCES paciente(id),
                      FOREIGN KEY (medico_id) REFERENCES medico(id)
);