package capstone.round_table.security;

import capstone.round_table.security.jwt.JwtConverter;

import capstone.round_table.security.jwt.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
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
            .antMatchers("/api/category").permitAll() // View all Categories
            .antMatchers("/api/comment/recipe/{recipeId}").permitAll() // View Recipe Comments
            .antMatchers("/api/comment/recipe").hasRole("WRITE") // Add Recipe Comments
            .antMatchers("/api/favorite/top").permitAll() // View Top Favorite Recipes
            .antMatchers("/api/favorite/count/{recipeId}").permitAll() // View Favorite Recipes
            .antMatchers("/api/ingredients").permitAll() // View all Ingredients
            .antMatchers("/api/recipes/*").permitAll()
            .antMatchers("/api/recipe_ingredient/*").permitAll()
            .antMatchers("/api/recipe_category/*").permitAll()
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
