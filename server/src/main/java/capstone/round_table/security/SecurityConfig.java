package capstone.round_table.security;

import capstone.round_table.security.jwt.JwtConverter;

import capstone.round_table.security.jwt.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.cors();
        http.authorizeRequests()
                .antMatchers("/api/auth/*").permitAll() // Login/Register
                .antMatchers(HttpMethod.GET, "/api/recipes").permitAll()
                .antMatchers(HttpMethod.GET, "/api/recipes/{recipeId}").permitAll()
                .antMatchers(HttpMethod.GET, "/api/recipes/user/{userId}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/recipes").hasAnyRole("USER", "ADMIN", "ROLE_USER")
                .antMatchers(HttpMethod.PUT, "/api/recipes/{recipeId}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/recipes/{recipeId}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/user").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/user/userId").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/user/{userId}").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/user/{userId}").hasRole("ADMIN")
                .anyRequest().permitAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);;
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

}
