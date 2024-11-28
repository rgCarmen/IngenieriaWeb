-- Inserción de datos para la tabla Paciente
INSERT INTO PACIENTE (nombre, apellidos, fecha_nacimiento, dni_nie, telefono, email, direccion, codigo_postal, ciudad, provincia) VALUES
 ('Juan', 'Pérez Gómez', '1980-03-15', '12345678A', '612345678', 'juan.perez@example.com', 'Calle Mayor, 1', '28001', 'Madrid', 'Madrid'),
 ('Ana', 'García Rodríguez', '1992-11-22', '98765432B', '698765432', 'ana.garcia@example.com', 'Calle Falsa, 123', '08001', 'Barcelona', 'Barcelona'),
 ('Luis', 'Martínez López', '1975-06-08', '56789012C', '656789012', 'luis.martinez@example.com', 'Avenida Diagonal, 456', '46001', 'Valencia', 'Valencia'),
 ('María', 'Sánchez Fernández', '2001-01-25', '23456789D', '623456789', 'maria.sanchez@example.com', 'Calle Principal, 7', '41001', 'Sevilla', 'Sevilla'),
 ('Pedro', 'González Ruiz', '1988-09-12', '89012345E', '689012345', 'pedro.gonzalez@example.com', 'Calle Secundaria, 89', '15001', 'A Coruña', 'A Coruña'),
 ('Isabel', 'Hernández Diaz', '1995-04-03', '45678901F', '645678901', 'isabel.hernandez@example.com', 'Calle Ancha, 10', '30001', 'Murcia', 'Murcia'),
 ('Carlos', 'Jiménez Moreno', '1972-12-19', '10111213G', '610111213', 'carlos.jimenez@example.com', 'Calle Estrecha, 11', '33001', 'Oviedo', 'Asturias'),
 ('Laura', 'Álvarez Pérez', '1998-07-07', '78901234H', '678901234', 'laura.alvarez@example.com', 'Calle Larga, 12', '39001', 'Santander', 'Cantabria'),
 ('Miguel', 'Romero García', '1985-02-28', '34567890I', '634567890', 'miguel.romero@example.com', 'Calle Corta, 13', '03001', 'Alicante', 'Alicante'),
 ('Sofía', 'Navarro Martínez', '2003-05-11', '90123456J', '690123456', 'sofia.navarro@example.com', 'Calle Nueva, 14', '29001', 'Málaga', 'Málaga');


-- Inserción de datos para la tabla Medico
INSERT INTO MEDICO (nombre, apellidos, especialidad, numero_colegiado, telefono, email, disponible) VALUES
 ('Elena', 'López García', 'Cardiología', '12345', '611111111', 'elena.lopez@medico.com', true),
 ('Javier', 'Fernández Díaz', 'Traumatología', '67890', '622222222', 'javier.fernandez@medico.com', true),
 ('Rosa', 'Martínez Sánchez', 'Pediatría', '13579', '633333333', 'rosa.martinez@medico.com', false),
 ('David', 'González Pérez', 'Medicina General', '24680', '644444444', 'david.gonzalez@medico.com', true),
 ('Marta', 'Rodríguez López', 'Dermatología', '97531', '655555555', 'marta.rodriguez@medico.com', true),
 ('Pablo', 'Hernández Jiménez', 'Oftalmología', '86420', '666666666', 'pablo.hernandez@medico.com', false),
 ('Sara', 'Álvarez Romero', 'Neurología', '75319', '677777777', 'sara.alvarez@medico.com', true),
 ('Andrés', 'Jiménez Navarro', 'Psiquiatría', '64208', '688888888', 'andres.jimenez@medico.com', true),
 ('Lucía', 'Moreno García', 'Ginecología', '53197', '699999999', 'lucia.moreno@medico.com', false),
 ('Jorge', 'Ruiz Sánchez', 'Urología', '42086', '600000000', 'jorge.ruiz@medico.com', true);



-- Inserción de datos para la tabla Cita.  Asegúrate de que los IDs de paciente y médico existan.
INSERT INTO CITA (paciente_id, medico_id, fecha_hora, tipo_cita, estado, motivo_consulta) VALUES
 (1, 1, '2024-08-01 10:00:00', 'REVISION', 'Programada', 'Control rutinario'),
 (2, 2, '2024-08-01 11:00:00', 'CONSULTA', 'Programada', 'Dolor de espalda'),
 (3, 4, '2024-08-01 12:00:00', 'URGENCIA', 'Finalizada', 'Gripe'),
 (4, 5, '2024-08-02 09:00:00', 'REVISION', 'Cancelada', 'Control dermatológico'),
 (5, 7, '2024-08-02 10:00:00', 'CONSULTA', 'Programada', 'Migraña'),
 (6, 8, '2024-08-02 11:00:00', 'URGENCIA', 'Finalizada', 'Ansiedad'),
 (7, 10, '2024-08-03 10:00:00', 'REVISION', 'Programada', 'Control urológico'),
 (8, 1, '2024-08-03 11:00:00', 'CONSULTA', 'Programada', 'Palpitaciones'),
 (9, 2, '2024-08-03 12:00:00', 'URGENCIA', 'Finalizada', 'Fractura'),
 (10, 4, '2024-08-05 09:00:00', 'REVISION', 'Programada', 'Control general');