INSERT INTO usuario (contrasena, email, rol) 
VALUES ('749146993', 'paciente@example.com', 'PACIENTE'), --contraseña paciente
('92668751', 'admin@example.com', 'ADMINISTRADOR'),--admin
('-1078031031',	'medico@example.com', 'MEDICO'); --medico 

-- Pacientes
INSERT INTO usuario (contrasena, email, rol) 
VALUES 
('749146993', 'paciente1@example.com', 'PACIENTE'), -- Contraseña: paciente
('-1279432087', 'paciente2@example.com', 'PACIENTE'), -- Contraseña: usuario123
('-1034364084', 'paciente3@example.com', 'PACIENTE'); -- Contraseña: miClaveSegura

-- Médicos
INSERT INTO usuario (contrasena, email, rol) 
VALUES 
('1179395', 'medico1@example.com', 'MEDICO'), -- Contraseña: doctor123
('-1370817313', 'medico2@example.com', 'MEDICO'), -- Contraseña: claveMedico
('39865412', 'medico3@example.com', 'MEDICO'); -- Contraseña: password123

----------------------------------------------------------------------------------------------------------------

INSERT INTO PACIENTE (nombre, apellidos, dni, telefono, usuario_id) VALUES
 ('Ana', 'García Rodríguez', '98765432B', '698765432', 1);

INSERT INTO MEDICO (nombre, apellidos, especialidad, telefono, usuario_id) VALUES
 ('Elena', 'López García', 'Cardiología', '611111111', 3);

-- Médicos
INSERT INTO medico (nombre, apellidos, telefono, especialidad, usuario_id) 
VALUES 
('Carlos', 'Pérez', '123456789', 'Cardiología', 7), -- Usuario medico1@example.com
('Laura', 'González', '987654321', 'Pediatría', 8), -- Usuario medico2@example.com
('María', 'López', '654789321', 'Dermatología', 9); -- Usuario medico3@example.com

-- Pacientes
INSERT INTO paciente (nombre, apellidos, dni, telefono, usuario_id) 
VALUES 
('Andrés', 'Martínez', '321654789L', '111222333', 4), -- Usuario paciente1@example.com
('Clara', 'Fernández', '624873159P', '444555666', 5), -- Usuario paciente2@example.com
('Luis', 'Ramírez', '459756288J', '777888999', 6); -- Usuario paciente3@example.com

------------------------------------------------------------------------------------------------------------------------

INSERT INTO CITA (FECHA, MEDICO_ID, PACIENTE_ID, DESCRIPCION, TIPO_CITA, DIAGNOSITICO)
VALUES
    ('2024-12-06 12:00:00', 1, 1, 'Fiebre 40 grados con tos leve', 'CONSULTA', 'Fiebre'),
    ('2024-12-10 09:00:00', 1, 1, 'Revisión de fiebre persistente', 'CONSULTA', 'Observación'),
    ('2024-12-15 14:00:00', 1, 1, 'Dolor de garganta y dificultad para tragar', 'CONSULTA', 'Amigdalitis'),
    ('2024-12-20 16:30:00', 1, 1, 'Chequeo general post recuperación', 'CONSULTA', 'Buen estado'),
    ('2025-01-05 11:00:00', 1, 1, 'Dolor abdominal leve', 'CONSULTA', 'Indigestión');

-- Citas para otros pacientes y médicos
INSERT INTO CITA (FECHA, MEDICO_ID, PACIENTE_ID, DESCRIPCION, TIPO_CITA, DIAGNOSITICO)
VALUES
    ('2024-12-11 10:00:00', 2, 2, 'Dolor en el pecho', 'CONSULTA', 'Angina de pecho'), -- Médico Carlos, paciente Andrés
    ('2024-12-12 15:00:00', 3, 3, 'Fiebre alta con vómitos', 'CONSULTA', 'Gastroenteritis'), -- Médico Laura, paciente Clara
    ('2024-12-13 12:30:00', 4, 4, 'Erupción en la piel', 'CONSULTA', 'Dermatitis'), -- Médico María, paciente Luis
    ('2024-12-14 16:00:00', 3, 3, 'Dolor en el oído', 'CONSULTA', 'Otitis media'), -- Médico Laura, paciente Andrés
    ('2024-12-15 17:30:00', 2, 4, 'Revisión de colesterol', 'CONSULTA', 'Colesterol alto'); -- Médico Carlos, paciente Luis

-- Citas libres (sin paciente asignado)
INSERT INTO CITA (FECHA, MEDICO_ID, PACIENTE_ID, DESCRIPCION, TIPO_CITA, DIAGNOSITICO)
VALUES
    ('2025-12-16 09:00:00', 2, NULL, 'Disponible para revisión general', 'CONSULTA', NULL), -- Médico Carlos
    ('2025-12-16 10:00:00', 3, NULL, 'Disponible para consulta pediátrica', 'CONSULTA', NULL), -- Médico Laura
    ('2025-12-16 11:00:00', 4, NULL, 'Disponible para consulta dermatológica', 'CONSULTA', NULL), -- Médico María
    ('2025-12-17 14:00:00', 2, NULL, 'Disponible para control de presión arterial', 'CONSULTA', NULL), -- Médico Carlos
    ('2025-12-17 15:30:00', 4, NULL, 'Disponible para revisión de alergias', 'CONSULTA', NULL); -- Médico María

--------------------------------------------------------------------------------------------------------------------

INSERT INTO notificaciones (usuario_id, mensaje, fecha_Envio) VALUES
(1, 'Tu próxima cita médica está programada para el 2024-12-20 a las 10:00 AM.', '2024-12-16 10:00:00'),
(1, 'Tu próxima cita médica está programada para el 2024-12-21 a las 11:00 AM.', '2024-12-16 10:05:00'),
(1, 'Tu próxima cita médica está programada para el 2024-12-22 a las 09:00 AM.', '2024-12-16 10:10:00');
