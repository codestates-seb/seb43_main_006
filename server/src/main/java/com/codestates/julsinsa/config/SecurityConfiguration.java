package com.codestates.julsinsa.config;

import com.codestates.julsinsa.auth.filter.JwtAuthenticationFilter;
import com.codestates.julsinsa.auth.filter.JwtVerificationFilter;
import com.codestates.julsinsa.auth.handler.*;
import com.codestates.julsinsa.auth.jwt.JwtTokenizer;
import com.codestates.julsinsa.auth.utills.CustomAuthorityUtils;
import com.codestates.julsinsa.member.repository.MemberRepository;
import com.codestates.julsinsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;

    private final CustomAuthorityUtils authorityUtils;

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()

                .cors()
                .configurationSource(corsConfigurationSource())

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()

                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가

                .and()//로그아웃 구현
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).permitAll()
                .logoutSuccessUrl("/")

                .and()
                .apply(new CustomFilterConfigurer())

                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .antMatchers(HttpMethod.GET, "/members").hasAnyRole("USER","ADMIN") // 회원 조회
                                .antMatchers(HttpMethod.PATCH, "/members").hasAnyRole("USER","ADMIN") // 회원 수정
                                .antMatchers(HttpMethod.DELETE, "/members").hasAnyRole("USER","ADMIN") // 회원 탈퇴
                                .antMatchers(HttpMethod.GET, "/members/favorite").hasAnyRole("USER","ADMIN") // 찜 목록보기
                                .antMatchers(HttpMethod.POST, "/items/*/favorite").hasAnyRole("USER","ADMIN") // 찜 하기
                                .antMatchers(HttpMethod.DELETE, "/items/*/favorite").hasAnyRole("USER","ADMIN") // 찜 삭제
                                .antMatchers(HttpMethod.GET, "/items/*/is-favorite").hasAnyRole("USER","ADMIN") // 찜 여부 확인
                                .antMatchers(HttpMethod.POST, "/items/*/reviews").hasAnyRole("USER","ADMIN") // 리뷰작성
                                .antMatchers(HttpMethod.PATCH, "/items/*/reviews/*").hasAnyRole("USER","ADMIN")// 리뷰수정
                                .antMatchers(HttpMethod.DELETE, "/items/*/reviews/*").hasAnyRole("USER","ADMIN") // 리뷰삭제
                                .antMatchers(HttpMethod.GET, "/items/*/cart").hasAnyRole("USER","ADMIN") // 장바구니 조회
                                .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer,authorityUtils, memberService))
                );;
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("*"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setExposedHeaders(Arrays.asList("*"));
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils,memberRepository);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);

        }
    }


}
