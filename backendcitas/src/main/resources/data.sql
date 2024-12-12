INSERT INTO usuario (contrasena, email, rol) 
VALUES ('749146993', 'paciente@example.com', 'PACIENTE'), --contraseña paciente
('92668751', 'admin@example.com', 'ADMINISTRADOR'),--admin
('-1078031031',	'medico@example.com', 'MEDICO'); --medico 

INSERT INTO PACIENTE (nombre, apellidos, dni, telefono, usuario_id) VALUES
 ('Ana', 'García Rodríguez', '98765432B', '698765432', 1);

INSERT INTO MEDICO (nombre, apellidos, especialidad, telefono, usuario_id) VALUES
 ('Elena', 'López García', 'Cardiología', '611111111', 3);


