package com.aplicacion.backendcitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.aplicacion.backendcitas.model")
@EnableJpaRepositories(basePackages = "com.aplicacion.backendcitas.model")
public class BackendcitasApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendcitasApplication.class, args);
	}

}
