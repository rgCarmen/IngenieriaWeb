package com.aplicacion.backendcitas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class SchemaDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private DataSource dataSource;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        try (Connection connection = dataSource.getConnection()) {
            // Ejecutar schema.sql
            ScriptUtils.executeSqlScript(connection, new ClassPathResource("schema.sql"));
            System.out.println("schema.sql ejecutado correctamente.");

            // Ejecutar data.sql
            ScriptUtils.executeSqlScript(connection, new ClassPathResource("data.sql"));
            System.out.println("data.sql ejecutado correctamente.");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error ejecutando los scripts SQL: " + e.getMessage());
        }
    }
}
