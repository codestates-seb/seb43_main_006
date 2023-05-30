package com.codestates.julsinsa.config;

import com.codestates.julsinsa.auth.jwt.JwtTokenizer;
import com.codestates.julsinsa.auth.utills.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordEncoderConfiguration {
    @Bean
    public PasswordEncoder passwordEncoder() { return PasswordEncoderFactories.createDelegatingPasswordEncoder(); }
    @Bean
    public JwtUtils jwtUtils() { return new JwtUtils(jwtTokenizer()); }
    @Bean
    public JwtTokenizer jwtTokenizer() {
        return new JwtTokenizer();
    }

    // 이것들을 SecurityConfiguration에 등록하면 순환 참조가 일어나게 된다. 그래서 따로뺌
}
