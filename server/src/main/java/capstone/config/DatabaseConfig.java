package capstone.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Parse Railway's DATABASE_URL format
            // Example: mysql://root:password@host:port/database
            URI dbUri = new URI(databaseUrl);
            
            String username = dbUri.getUserInfo().split(":")[0];
            String password = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:mysql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + 
                          "?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
            
            return DataSourceBuilder.create()
                    .url(dbUrl)
                    .username(username)
                    .password(password)
                    .driverClassName("com.mysql.cj.jdbc.Driver")
                    .build();
        }
        
        // Fallback to individual environment variables
        return DataSourceBuilder.create()
                .url("jdbc:mysql://" + System.getenv("DB_HOST") + ":" + 
                     System.getenv("DB_PORT") + "/" + System.getenv("DB_NAME") + 
                     "?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true")
                .username(System.getenv("DB_USERNAME"))
                .password(System.getenv("DB_PASSWORD"))
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}