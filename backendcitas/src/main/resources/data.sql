-- Insercion de datos para la tabla Usuario
INSERT INTO usuario (contrasena, email, nombre, rol) 
VALUES ('749146993', 'paciente@example.com', 'paciente', 'PACIENTE'), --contraseña paciente
('92668751',	'admin@example.com',	'admin', 'ADMINISTRADOR'),--admin
('-1078031031',	'medico@example.com',	'medico',	'MEDICO'); --medico 



-- Inserción de datos para la tabla Paciente
INSERT INTO PACIENTE (nombre, apellidos, dni, telefono, email) VALUES
 ('Juan', 'Pérez Gómez', '12345678A', '612345678', 'juan.perez@example.com'),
 ('Ana', 'García Rodríguez', '98765432B', '698765432', 'ana.garcia@example.com'),
 ('Luis', 'Martínez López', '56789012C', '656789012', 'luis.martinez@example.com'),
 ('María', 'Sánchez Fernández', '23456789D', '623456789', 'maria.sanchez@example.com'),
 ('Pedro', 'González Ruiz', '89012345E', '689012345', 'pedro.gonzalez@example.com'),
 ('Isabel', 'Hernández Diaz', '45678901F', '645678901', 'isabel.hernandez@example.com'),
 ('Carlos', 'Jiménez Moreno', '10111213G', '610111213', 'carlos.jimenez@example.com'),
 ('Laura', 'Álvarez Pérez', '78901234H', '678901234', 'laura.alvarez@example.com'),
 ('Miguel', 'Romero García', '34567890I', '634567890', 'miguel.romero@example.com'),
 ('Sofía', 'Navarro Martínez', '90123456J', '690123456', 'sofia.navarro@example.com');


-- Inserción de datos para la tabla Medico
INSERT INTO MEDICO (nombre, apellidos, especialidad, telefono, email) VALUES
 ('Elena', 'López García', 'Cardiología', '611111111', 'elena.lopez@medico.com'),
 ('Javier', 'Fernández Díaz', 'Traumatología', '622222222', 'javier.fernandez@medico.com'),
 ('Rosa', 'Martínez Sánchez', 'Pediatría', '633333333', 'rosa.martinez@medico.com'),
 ('David', 'González Pérez', 'Medicina General', '644444444', 'david.gonzalez@medico.com'),
 ('Marta', 'Rodríguez López', 'Dermatología', '655555555', 'marta.rodriguez@medico.com'),
 ('Pablo', 'Hernández Jiménez', 'Oftalmología', '666666666', 'pablo.hernandez@medico.com'),
 ('Sara', 'Álvarez Romero', 'Neurología', '677777777', 'sara.alvarez@medico.com'),
 ('Andrés', 'Jiménez Navarro', 'Psiquiatría', '688888888', 'andres.jimenez@medico.com'),
 ('Lucía', 'Moreno García', 'Ginecología', '699999999', 'lucia.moreno@medico.com'),
 ('Jorge', 'Ruiz Sánchez', 'Urología', '600000000', 'jorge.ruiz@medico.com');

-- Cita de Juan Pérez con la médica Elena López (Cardiología)
INSERT INTO CITA (fecha, descripcion, paciente_id, medico_id, tipo_cita)
VALUES
    ('2024-12-05 10:00:00', 'Consulta de Cardiología',
     (SELECT id FROM PACIENTE WHERE dni = '12345678A'),
     (SELECT id FROM MEDICO WHERE especialidad = 'Cardiología'),
     'CONSULTA');

-- Cita de Ana García con el médico Javier Fernández (Traumatología)
INSERT INTO CITA (fecha, descripcion, paciente_id, medico_id, tipo_cita)
VALUES
    ('2024-12-06 12:00:00', 'Consulta de Traumatología',
     (SELECT id FROM PACIENTE WHERE dni = '98765432B'),
     (SELECT id FROM MEDICO WHERE especialidad = 'Traumatología'),
     'CONSULTA');

-- Cita de Luis Martínez con la médica Rosa Martínez (Pediatría)
INSERT INTO CITA (fecha, descripcion, paciente_id, medico_id, tipo_cita)
VALUES
    ('2024-12-07 09:00:00', 'Consulta de Pediatría',
     (SELECT id FROM PACIENTE WHERE dni = '56789012C'),
     (SELECT id FROM MEDICO WHERE especialidad = 'Pediatría'),
     'CONSULTA');

-- Cita de María Sánchez con el médico David González (Medicina General)
INSERT INTO CITA (fecha, descripcion, paciente_id, medico_id, tipo_cita)
VALUES
    ('2024-12-08 15:00:00', 'Consulta de Medicina General',
     (SELECT id FROM PACIENTE WHERE dni = '23456789D'),
     (SELECT id FROM MEDICO WHERE especialidad = 'Medicina General'),
     'CONSULTA');

-- Cita de Pedro González con la médica Marta Rodríguez (Dermatología)
INSERT INTO CITA (fecha, descripcion, paciente_id, medico_id, tipo_cita)
VALUES
    ('2024-12-09 11:30:00', 'Consulta de Dermatología',
     (SELECT id FROM PACIENTE WHERE dni = '89012345E'),
     (SELECT id FROM MEDICO WHERE especialidad = 'Dermatología'),
     'CONSULTA');

