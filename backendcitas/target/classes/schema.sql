CREATE TABLE IF NOT EXISTS PACIENTE (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          apellidos VARCHAR(255) NOT NULL,
                          dni VARCHAR(20) NOT NULL,
                          telefono VARCHAR(20) NOT NULL,
                          email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS MEDICO (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(255) NOT NULL,
                        apellidos VARCHAR(255) NOT NULL,
                        especialidad VARCHAR(255) NOT NULL,
                        telefono VARCHAR(20) NOT NULL,
                        email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS CITA (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    paciente_id BIGINT NOT NULL,
    medico_id BIGINT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    tipo_cita VARCHAR(50),
    descripcion VARCHAR(255),  -- Columna descripcion añadida
    FOREIGN KEY (paciente_id) REFERENCES paciente(id),
    FOREIGN KEY (medico_id) REFERENCES medico(id)
);

-- Establecer el valor inicial para la tabla PACIENTE
ALTER TABLE PACIENTE ALTER COLUMN id RESTART WITH 1000;

-- Establecer el valor inicial para la tabla MEDICO
ALTER TABLE MEDICO ALTER COLUMN id RESTART WITH 2000;

-- Establecer el valor inicial para la tabla CITA
ALTER TABLE CITA ALTER COLUMN id RESTART WITH 3000;