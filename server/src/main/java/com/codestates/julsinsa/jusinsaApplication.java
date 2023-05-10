package com.codestates.julsinsa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class jusinsaApplication {

	public static void main(String[] args) {
		SpringApplication.run(jusinsaApplication.class, args);
	}

}
